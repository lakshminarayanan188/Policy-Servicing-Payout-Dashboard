export interface Module { code: string; name: string; }
export interface Product { id: string; name: string; moduleCode: string; }
export interface StageCount { stage: string; count: number; prevCount: number; color: string; agingCount: number; sparkline: number[]; }
export interface StageCounts { counts: StageCount[]; totalPending: number; prevTotalPending: number; totalPoliciesTODAY: number; amountInPipeline: number; slaBreaches: number; }
export interface DrillRecord { policyNo: string; insuredName: string; product: string; amount: number; stage: string; enteredAt: Date; agingDays: number; status: string; }
export interface PagedResult<T> { data: T[]; total: number; page: number; size: number; }
export interface TrendPoint { date: string; extract: number; approve: number; techBucket: number; sanction: number; paid: number; }
export interface Scheduler { id: string; name: string; jobClass: string; module: string; status: 'IDLE' | 'RUNNING' | 'FAILED' | 'DISABLED'; lastRunTime: Date | null; lastRunStatus: 'SUCCESS' | 'FAILED' | 'RUNNING' | null; nextRunTime: Date | null; cronExpression: string; recordsProcessed: number; durationMs: number; errorMessage: string | null; enabled: boolean; }
export interface RunHistory { id: string; schedulerId: string; startTime: Date; endTime: Date | null; status: 'SUCCESS' | 'FAILED' | 'RUNNING'; recordsProcessed: number; durationMs: number; errorMessage: string | null; }

export const MODULES: Module[] = [
  { code: 'SB', name: 'Savings Bond' },
  { code: 'MAT', name: 'Maturity' },
  { code: 'ANN', name: 'Annuity' },
  { code: 'SUR', name: 'Surrender' },
  { code: 'DCL', name: 'Death Claim' }
];

export const PRODUCTS: Product[] = [
  { id: 'SB001', name: 'SB Classic', moduleCode: 'SB' },
  { id: 'SB002', name: 'SB Premium', moduleCode: 'SB' },
  { id: 'SB003', name: 'SB Gold', moduleCode: 'SB' },
  { id: 'MAT001', name: 'Endowment Plus', moduleCode: 'MAT' },
  { id: 'MAT002', name: 'Money Back 20', moduleCode: 'MAT' },
  { id: 'MAT003', name: 'Term Wealth', moduleCode: 'MAT' },
  { id: 'ANN001', name: 'Immediate Annuity', moduleCode: 'ANN' },
  { id: 'ANN002', name: 'Deferred Annuity', moduleCode: 'ANN' },
  { id: 'SUR001', name: 'Partial Surrender', moduleCode: 'SUR' },
  { id: 'SUR002', name: 'Full Surrender', moduleCode: 'SUR' },
  { id: 'SUR003', name: 'Partial Withdrawal', moduleCode: 'SUR' },
  { id: 'DCL001', name: 'Natural Death', moduleCode: 'DCL' },
  { id: 'DCL002', name: 'Accidental Death', moduleCode: 'DCL' },
  { id: 'DCL003', name: 'Critical Illness', moduleCode: 'DCL' },
  { id: 'DCL004', name: 'Term Rider Death', moduleCode: 'DCL' }
];

const STAGE_COLORS: Record<string, string> = {
  Extract: '#3B82F6',
  Approve: '#6366F1',
  'Tech Bucket': '#F59E0B',
  Sanction: '#F97316',
  Paid: '#22C55E'
};

function sparkline(base: number): number[] {
  return Array.from({ length: 7 }, (_, i) => Math.max(0, base + Math.round((Math.random() - 0.5) * base * 0.4)));
}

export function getStageCounts(moduleCode: string): StageCounts {
  const seed = moduleCode.charCodeAt(0);
  const counts: StageCount[] = [
    { stage: 'Extract',     count: 120 + seed,   prevCount: 100 + seed,   color: STAGE_COLORS['Extract'],     agingCount: 18, sparkline: sparkline(120) },
    { stage: 'Approve',     count: 85 + seed,    prevCount: 90 + seed,    color: STAGE_COLORS['Approve'],     agingCount: 6,  sparkline: sparkline(85)  },
    { stage: 'Tech Bucket', count: 42 + seed,    prevCount: 35 + seed,    color: STAGE_COLORS['Tech Bucket'], agingCount: 12, sparkline: sparkline(42)  },
    { stage: 'Sanction',    count: 60 + seed,    prevCount: 55 + seed,    color: STAGE_COLORS['Sanction'],    agingCount: 3,  sparkline: sparkline(60)  },
    { stage: 'Paid',        count: 200 + seed,   prevCount: 180 + seed,   color: STAGE_COLORS['Paid'],        agingCount: 0,  sparkline: sparkline(200) }
  ];
  const totalPending = counts.slice(0, 4).reduce((s, c) => s + c.count, 0);
  return { counts, totalPending, prevTotalPending: totalPending - 20, totalPoliciesToday: 520, amountInPipeline: 12840000, slaBreaches: 7 } as any;
}

const NAMES = ['Arjun Mehta','Priya Sharma','Karthik R','Divya N','Suresh B','Anitha K','Ravi P','Meena S','Vijay T','Lakshmi A','Santhosh M','Pooja V','Ramesh D','Geetha C','Arun J','Nithya L','Mohan R','Kavitha S','Bala G','Swathi H','Rajesh P','Deepa N','Siva K','Malar A','Dinesh R','Pavithra B','Ganesh T','Saranya V','Murugan S','Anbu M'];

export function getDrillRecords(stage: string, moduleCode: string, page: number, size: number): PagedResult<DrillRecord> {
  const products = PRODUCTS.filter(p => p.moduleCode === moduleCode);
  const total = 52;
  const data: DrillRecord[] = Array.from({ length: Math.min(size, total - page * size) }, (_, i) => {
    const idx = page * size + i;
    return {
      policyNo: `POL${moduleCode}${String(idx + 1001).padStart(6, '0')}`,
      insuredName: NAMES[idx % NAMES.length],
      product: products[idx % products.length] ? products[idx % products.length].id : 'N/A',
      amount: Math.round((50000 + Math.random() * 950000) / 100) * 100,
      stage,
      enteredAt: new Date(Date.now() - (idx + 1) * 3600000 * 8),
      agingDays: Math.floor(idx / 3),
      status: idx % 7 === 0 ? 'HOLD' : 'ACTIVE'
    };
  });
  return { data, total, page, size };
}

function trendDate(daysAgo: number): string {
  const d = new Date(); d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export function getTrend(moduleCode: string): TrendPoint[] {
  const s = moduleCode.charCodeAt(0);
  return Array.from({ length: 7 }, (_, i) => ({
    date: trendDate(6 - i),
    extract: 100 + s + i * 5 + Math.round(Math.random() * 15),
    approve: 70 + s + i * 3 + Math.round(Math.random() * 10),
    techBucket: 35 + s + i * 2 + Math.round(Math.random() * 8),
    sanction: 50 + s + i * 4 + Math.round(Math.random() * 12),
    paid: 170 + s + i * 8 + Math.round(Math.random() * 20)
  }));
}

const now = new Date();
function minsAgo(m: number): Date { return new Date(now.getTime() - m * 60000); }
function minsFrom(m: number): Date { return new Date(now.getTime() + m * 60000); }

export const SCHEDULERS: Scheduler[] = [
  { id: 's1',  name: 'Extract SB Daily',         jobClass: 'ExtractSBJob',        module: 'SB',  status: 'IDLE',     lastRunTime: minsAgo(35),  lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(25),  cronExpression: '0 0 6 * * ?',    recordsProcessed: 1243, durationMs: 48200, errorMessage: null,    enabled: true  },
  { id: 's2',  name: 'Approve Pipeline MAT',      jobClass: 'ApprovePipelineJob',  module: 'MAT', status: 'RUNNING',  lastRunTime: minsAgo(2),   lastRunStatus: 'RUNNING', nextRunTime: minsFrom(58),  cronExpression: '0 0/30 * * * ?', recordsProcessed: 0,    durationMs: 0,     errorMessage: null,    enabled: true  },
  { id: 's3',  name: 'Tech Bucket Validator',     jobClass: 'TechBucketJob',       module: 'ANN', status: 'FAILED',   lastRunTime: minsAgo(120), lastRunStatus: 'FAILED',  nextRunTime: minsFrom(60),  cronExpression: '0 15 * * * ?',   recordsProcessed: 0,    durationMs: 3200,  errorMessage: 'ORA-01400: cannot insert NULL into column POLICY_NO', enabled: true  },
  { id: 's4',  name: 'Sanction Batch SUR',        jobClass: 'SanctionBatchJob',    module: 'SUR', status: 'IDLE',     lastRunTime: minsAgo(90),  lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(30),  cronExpression: '0 30 8 * * ?',   recordsProcessed: 847,  durationMs: 62100, errorMessage: null,    enabled: true  },
  { id: 's5',  name: 'Death Claim Processor',     jobClass: 'DeathClaimJob',       module: 'DCL', status: 'IDLE',     lastRunTime: minsAgo(180), lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(180), cronExpression: '0 0 8,14 * * ?', recordsProcessed: 234,  durationMs: 29500, errorMessage: null,    enabled: true  },
  { id: 's6',  name: 'Paid Status Sync',          jobClass: 'PaidSyncJob',         module: 'SB',  status: 'IDLE',     lastRunTime: minsAgo(15),  lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(45),  cronExpression: '0 0/20 * * * ?', recordsProcessed: 3120, durationMs: 21400, errorMessage: null,    enabled: true  },
  { id: 's7',  name: 'SLA Breach Alerter',        jobClass: 'SLAAlertJob',         module: 'SB',  status: 'IDLE',     lastRunTime: minsAgo(5),   lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(55),  cronExpression: '0 0 * * * ?',    recordsProcessed: 12,   durationMs: 1200,  errorMessage: null,    enabled: true  },
  { id: 's8',  name: 'Annuity Renewal Runner',    jobClass: 'AnnuityRenewalJob',   module: 'ANN', status: 'DISABLED', lastRunTime: minsAgo(500), lastRunStatus: 'SUCCESS', nextRunTime: null,           cronExpression: '0 0 9 * * MON',  recordsProcessed: 0,    durationMs: 0,     errorMessage: null,    enabled: false },
  { id: 's9',  name: 'Reconciliation Maturity',   jobClass: 'ReconJob',            module: 'MAT', status: 'IDLE',     lastRunTime: minsAgo(720), lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(720), cronExpression: '0 0 23 * * ?',   recordsProcessed: 5640, durationMs: 185000,errorMessage: null,    enabled: true  },
  { id: 's10', name: 'Extract DCL Overnight',     jobClass: 'ExtractDCLJob',       module: 'DCL', status: 'IDLE',     lastRunTime: minsAgo(480), lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(960), cronExpression: '0 0 1 * * ?',    recordsProcessed: 89,   durationMs: 14200, errorMessage: null,    enabled: true  },
  { id: 's11', name: 'Archive Paid Records',      jobClass: 'ArchiveJob',          module: 'SB',  status: 'FAILED',   lastRunTime: minsAgo(300), lastRunStatus: 'FAILED',  nextRunTime: minsFrom(1440),cronExpression: '0 0 2 * * SUN',  recordsProcessed: 0,    durationMs: 8900,  errorMessage: 'Tablespace ARCH_DATA is full',                        enabled: true  },
  { id: 's12', name: 'Daily Summary Report',      jobClass: 'DailySummaryJob',     module: 'SB',  status: 'IDLE',     lastRunTime: minsAgo(60),  lastRunStatus: 'SUCCESS', nextRunTime: minsFrom(1380),cronExpression: '0 30 17 * * ?',  recordsProcessed: 1,    durationMs: 3400,  errorMessage: null,    enabled: true  }
];

export function getRunHistory(schedulerId: string): RunHistory[] {
  return Array.from({ length: 10 }, (_, i) => {
    const sch = SCHEDULERS.find(s => s.id === schedulerId);
    const success = i === 0 ? (sch && sch.lastRunStatus === 'FAILED' ? false : true) : i % 5 !== 0;
    const dur = success ? 15000 + Math.random() * 60000 : 3000 + Math.random() * 5000;
    const start = new Date(now.getTime() - (i + 1) * 3600000 * 4);
    return {
      id: `${schedulerId}-h${i}`,
      schedulerId,
      startTime: start,
      endTime: new Date(start.getTime() + dur),
      status: (success ? 'SUCCESS' : 'FAILED') as 'SUCCESS' | 'FAILED',
      recordsProcessed: success ? Math.floor(Math.random() * 2000) : 0,
      durationMs: Math.round(dur),
      errorMessage: success ? null : 'Job execution failed: database connection timeout'
    };
  });
}
