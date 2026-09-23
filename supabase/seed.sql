insert into templates(slug,name,category,description,price,platforms,active) values
('hr-payroll-mis','HR Payroll MIS Dashboard','HR','Monthly payroll cost, headcount, deductions, department and location MIS.',799,array['excel','powerbi','googlesheets','tableau'],true),
('attendance-leave','Attendance & Leave Tracker','HR','Attendance, late marks, leave balances, absenteeism and monthly trends.',399,array['excel','powerbi','googlesheets'],true),
('pf-esic-compliance','PF / ESIC Compliance Tracker','HR','Employee statutory enrolment, contribution checks, exceptions and filing readiness.',499,array['excel','powerbi','googlesheets'],true),
('full-final','Full & Final Calculator','HR','F&F calculation workbook with notice pay, leave encashment and deductions.',499,array['excel','googlesheets'],true),
('employee-master','Employee Master Dashboard','HR','Central employee master with department, location, employment type and status views.',599,array['excel','powerbi','googlesheets','tableau'],true),
('recruitment-ats','Recruitment ATS Tracker','HR','Requisition, candidate pipeline, interview, offer and joining analytics.',499,array['excel','powerbi','googlesheets','tableau'],true),
('onboarding','Employee Onboarding Tracker','HR','Joining checklist, document status, BGV, PF/ESIC and onboarding TAT.',399,array['excel','powerbi','googlesheets','powerautomate'],true),
('attrition','Attrition Analysis Dashboard','HR','Monthly exits, voluntary/involuntary analysis, annualized attrition and trends.',599,array['excel','powerbi','googlesheets','tableau'],true),
('sales-pipeline','Sales Pipeline Dashboard','Sales','Lead funnel, conversion, owner performance, revenue pipeline and ageing.',699,array['excel','powerbi','googlesheets','tableau'],true),
('sales-incentive','Sales Incentive Calculator','Sales','Target achievement, slabs, incentives, exceptions and payout reconciliation.',499,array['excel','googlesheets'],true),
('finance-cashflow','Finance Cash Flow Dashboard','Finance','Receivables, payables, cash position, monthly movement and ageing.',799,array['excel','powerbi','googlesheets','tableau'],true),
('inventory-control','Inventory Control Dashboard','Inventory','Stock levels, reorder alerts, movement, ageing and inventory value.',699,array['excel','powerbi','googlesheets','tableau'],true),
('project-tracker','Project Tracker & PMO Dashboard','Project','Project status, milestones, owners, delays, workload and risk tracking.',599,array['excel','powerbi','googlesheets','tableau'],true),
('operations-kpi','Operations KPI Dashboard','Operations','Daily operational KPIs, SLA tracking, productivity and exception monitoring.',699,array['excel','powerbi','googlesheets','tableau'],true),
('custom-business-dashboard','Custom Business Dashboard','Custom','Customer-defined dashboard with a requirements-led implementation pack.',1999,array['excel','powerbi','googlesheets','powerautomate','tableau'],true)
on conflict(slug) do update set
  name=excluded.name,
  category=excluded.category,
  description=excluded.description,
  price=excluded.price,
  platforms=excluded.platforms,
  active=excluded.active,
  updated_at=now();
