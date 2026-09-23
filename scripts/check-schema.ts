/**
 * Schema guard tests.
 *
 *   npm run check:schema
 *
 * The work schema exists to stop three specific mistakes reaching production:
 * a blank personal-contribution field, a client name in a public string, and a
 * confidentiality review that does not match the tier being published. Those
 * guards are only worth anything if they actually fire, so this asserts that
 * each one does — and that a valid entry still passes.
 *
 * None of this fabricates project content. The fixtures below are obviously
 * synthetic, live outside src/content/, and are never built or published.
 */
import { workSchema } from '../src/content/schema.ts';
import { containsRestrictedName } from '../src/lib/confidentiality.ts';

let failures = 0;

function check(name: string, condition: boolean, detail = ''): void {
  if (condition) {
    console.log(`  PASS  ${name}`);
  } else {
    failures += 1;
    console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  }
}

/** A minimal entry that satisfies every rule. Deliberately generic. */
function validEntry(overrides: Record<string, unknown> = {}) {
  return {
    title: 'Remediating security findings without dependency upgrades',
    slug: 'security-remediation-without-upgrades',
    order: 1,
    featured: true,
    disclosure: 'abstracted',
    clientDescriptor: 'A production enterprise mobile application',
    confidentialityReview: {
      reviewedBy: 'Test Fixture',
      reviewedOn: new Date('2026-09-23'),
      tierConfirmed: 'abstracted',
    },
    problem: 'A security assessment returned findings that had to be closed.',
    myRole: 'Sole mobile developer. Investigated and remediated each finding.',
    outcome: 'All findings were closed and the build was released.',
    stack: ['Kotlin', 'Room'],
    domain: ['enterprise-mobility'],
    workType: ['security', 'maintenance'],
    period: { start: '2024', end: '2024' },
    stages: ['analysis', 'development', 'testing', 'release'],
    description: 'Closing security findings under a no-upgrade constraint.',
    updated: new Date('2026-09-23'),
    ...overrides,
  };
}

console.log('\nConfidentiality guard\n');

check('detects a plain restricted name', containsRestrictedName('ctbc'));
check('is case-insensitive', containsRestrictedName('CTBC'));
check('defeats separator evasion (c-t-b-c)', containsRestrictedName('c-t-b-c'));
check('defeats dot evasion (C.T.B.C)', containsRestrictedName('C.T.B.C'));
check('finds a name inside a longer slug', containsRestrictedName('the-ctbc-appraisal-app'));
check('passes innocent text', !containsRestrictedName('an enterprise mobile application'));

console.log('\nSchema — the valid case must still pass\n');

const ok = workSchema.safeParse(validEntry());
check('a fully valid entry parses', ok.success, ok.success ? '' : JSON.stringify(ok.error.issues));

console.log('\nSchema — each guard must fire\n');

const emptyRole = workSchema.safeParse(validEntry({ myRole: '' }));
check('empty myRole is rejected (REQ-002)', !emptyRole.success);

const emptyOutcome = workSchema.safeParse(validEntry({ outcome: '' }));
check('empty outcome is rejected', !emptyOutcome.success);

const emptyDescriptor = workSchema.safeParse(validEntry({ clientDescriptor: '' }));
check('empty clientDescriptor is rejected', !emptyDescriptor.success);

const tierMismatch = workSchema.safeParse(
  validEntry({
    disclosure: 'sectoral',
    confidentialityReview: {
      reviewedBy: 'Test Fixture',
      reviewedOn: new Date('2026-09-23'),
      tierConfirmed: 'abstracted',
    },
  }),
);
check('reviewed tier must match published tier', !tierMismatch.success);

const clientOnAbstracted = workSchema.safeParse(validEntry({ client: 'Some Client' }));
check('non-named project may not set `client`', !clientOnAbstracted.success);

const namedWithoutClient = workSchema.safeParse(
  validEntry({
    disclosure: 'named',
    confidentialityReview: {
      reviewedBy: 'Test Fixture',
      reviewedOn: new Date('2026-09-23'),
      tierConfirmed: 'named',
    },
  }),
);
check('named project must set `client`', !namedWithoutClient.success);

console.log('\nSchema — client names must not reach public strings\n');

const leakyFields = ['slug', 'title', 'description', 'clientDescriptor', 'problem', 'myRole', 'outcome'];
for (const field of leakyFields) {
  const leaked = workSchema.safeParse(
    validEntry({
      [field]:
        field === 'slug'
          ? 'ctbc-appraisal-app'
          : `Work delivered for CTBC on their appraisal system.`,
    }),
  );
  check(`a client name in \`${field}\` is rejected`, !leaked.success);
}

const namedAllowed = workSchema.safeParse(
  validEntry({
    disclosure: 'named',
    client: 'CTBC',
    clientDescriptor: 'CTBC',
    confidentialityReview: {
      reviewedBy: 'Test Fixture',
      reviewedOn: new Date('2026-09-23'),
      tierConfirmed: 'named',
    },
  }),
);
check(
  'a NAMED project may use the client name',
  namedAllowed.success,
  namedAllowed.success ? '' : JSON.stringify(namedAllowed.error.issues),
);

console.log(
  failures === 0
    ? '\nAll schema guards fire correctly.\n'
    : `\n${failures} check(s) failed.\n`,
);

process.exit(failures === 0 ? 0 : 1);
