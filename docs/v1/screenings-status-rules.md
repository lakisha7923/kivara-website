# Background Check & Drug Screen — Status Rules

## Purpose

Kivara stores **minimum necessary status** for Work Ready. Vendors hold sensitive reports. CNAs see status + next step only. Admins see restricted notes and review actions.

## Screens

### CNA

| Screen | Route | Job |
|---|---|---|
| Credential list | `/cna/credentials` | Shows Background Check + Drug Screen with status |
| Screening detail | `/cna/credentials/[id]` | Consent, order status, next steps, demo vendor outcomes |
| Work Ready | `/cna/work-ready` | Lists required screenings and blockers |

### Admin

| Screen | Route | Job |
|---|---|---|
| CNA Credentials tab | `/admin/cnas/[id]` | Order / Clear / Consider / Fail screening |
| Work Ready tab | `/admin/cnas/[id]` | Shows computed blockers from screening rules |

## Order status → credential status → Work Ready

| Screening order status | Credential status | Blocks Work Ready? | CNA sees | Admin action |
|---|---|---|---|---|
| Not Started | Missing | Yes | Not started | Collect consent / order |
| Consent Needed | Missing | Yes | Sign consent | Wait, then order |
| Ordered | Pending Review | Yes | Ordered + instructions | Monitor vendor webhook |
| In Progress | Pending Review | Yes | In progress | Monitor vendor |
| Clear | Approved | No | Cleared | None unless expired |
| Consider | Pending Review | Yes | Needs Kivara review | Review report; Clear / Fail / Restrict |
| Failed | Rejected | Yes | Did not clear + support | Document; keep blocked |
| Expired | Expired | Yes | Expired; reorder | Reorder package |
| Cancelled | Missing | Yes | Cancelled; restart | Reorder if required |

## Work Ready rule (V1)

Work Ready requires these credentials in good standing (`Approved` or `Expiring Soon`):

1. CNA License  
2. CPR / BLS  
3. TB Screening  
4. Background Check  
5. Drug Screen  

Any Missing / Pending Review / Rejected / Expired required item blocks Work Ready.

## Integration placeholders

- Background vendor: **Checkr (planned)**  
- Drug screen vendor: **Lab partner (planned)**  
- Demo UI simulates order + webhook outcomes until APIs are connected.
