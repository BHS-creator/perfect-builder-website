-- Perfect Building Contractor: invoice VAT + contract balance portal migration
-- Run this in Supabase SQL Editor after the existing documents table is created.

alter table public.documents add column if not exists contract_total numeric(12,2) not null default 0;

drop function if exists public.lookup_client_invoice(text,text);

create function public.lookup_client_invoice(p_number text, p_email text)
returns table (
  invoice_number text, client_name text, project_name text, invoice_date date, due_date date,
  status text, subtotal numeric, vat numeric, total numeric, paid_amount numeric, balance_due numeric,
  currency text, vat_rate numeric, contract_total numeric, previously_invoiced numeric, total_invoiced numeric,
  paid_to_date numeric, remaining_to_invoice numeric, contract_balance_due numeric
)
language sql security definer set search_path=public as $$
  select d.number, coalesce(d.client_name,c.name), d.project_name, d.doc_date, d.due_date, d.status,
         d.subtotal, d.vat, d.total,
         least(greatest(coalesce(d.paid_amount,0),0),greatest(d.total,0)),
         greatest(d.total-least(greatest(coalesce(d.paid_amount,0),0),greatest(d.total,0)),0),
         d.currency, d.vat_rate,
         coalesce(nullif(d.contract_total,0),agg.contract_total,0),
         greatest(agg.total_invoiced-d.total,0), agg.total_invoiced, agg.paid_to_date,
         greatest(coalesce(nullif(d.contract_total,0),agg.contract_total,0)-agg.total_invoiced,0),
         greatest(coalesce(nullif(d.contract_total,0),agg.contract_total,0)-agg.total_invoiced,0)
  from public.documents d
  left join public.clients c on c.id=d.client_id
  cross join lateral (
    select coalesce(max(x.contract_total),0) contract_total,
           coalesce(sum(x.total),0) total_invoiced,
           coalesce(sum(least(greatest(coalesce(x.paid_amount,0),0),greatest(x.total,0))),0) paid_to_date
    from public.documents x
    where x.type='invoice' and x.owner_id=d.owner_id
      and ((d.project_id is not null and x.project_id=d.project_id)
        or (d.project_id is null and x.client_id=d.client_id))
  ) agg
  where d.type='invoice'
    and lower(trim(d.number))=lower(trim(p_number))
    and lower(trim(coalesce(c.email,'')))=lower(trim(p_email))
  limit 1;
$$;

revoke all on function public.lookup_client_invoice(text,text) from public;
grant execute on function public.lookup_client_invoice(text,text) to anon, authenticated;
