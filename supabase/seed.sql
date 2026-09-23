insert into templates(slug,name,price,active) values
('hr-payroll-mis','HR Payroll MIS Dashboard',799,true),
('attendance-leave','Attendance & Leave Tracker',399,true),
('pf-esic-compliance','PF / ESIC Compliance Tracker',499,true),
('full-final','Full & Final Calculator',499,true),
('employee-master','Employee Master + HR Dashboard',599,true),
('recruitment-ats','Recruitment / ATS Tracker',499,true),
('onboarding','Employee Onboarding Tracker',399,true),
('attrition','Attrition Analysis Dashboard',599,true),
('diversity','Diversity Dashboard',499,true),
('hr-compliance','HR Compliance Calendar',399,true),
('payroll-audit','Payroll Audit Checklist',699,true),
('custom-dashboard','Custom HR Dashboard',1999,true)
on conflict(slug) do update set name=excluded.name,price=excluded.price,active=excluded.active;