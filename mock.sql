INSERT OR IGNORE INTO environments (name) VALUES  ('development');
INSERT OR IGNORE INTO environments (name) VALUES ('preproduction');

INSERT OR IGNORE INTO builds (environment, timestamp, duration, status, extra) VALUES
  ('development', 1689532800, 120.5, 'success', 'Alice'),
  ('development', 1689532801, 90.2, 'fail', 'Bob"]'),
  ('development', 1689532802, NULL, 'pending', 'Charlie'),
  ('development', 1689532803, 150.3, 'success', 'Alice'),
  ('development', 1689532804, 75.4, 'fail', 'Bob'),
  ('development', 1689532805, NULL, 'pending', 'Charlie'),
  ('development', 1689532806, 180.2, 'success', 'Alice'),
  ('development', 1689532807, 100.1, 'fail', 'Bob'),
  ('development', 1689532808, NULL, 'pending', 'Charlie'),
  ('development', 1689532809, 210.4, 'success', 'Alice'),
  ('development', 1689532810, 120.5, 'fail', 'Bob'),
  ('development', 1689532811, NULL, 'pending', 'Charlie'),
  ('development', 1689532812, 60.1, 'success', 'Alice, Bob'),
  ('development', 1689532813, 150.3, 'fail', 'Charlie'),
  ('development', 1689532814, NULL, 'pending', 'Alice'),
  ('development', 1689532815, 45.6, 'success', 'Bob'),
  ('development', 1689532816, 180.2, 'fail', 'Charlie'),
  ('development', 1689532817, NULL, 'pending', 'Alice'),
  ('development', 1689532818, 30.8, 'success', 'Bob'),
  ('development', 1689532819, 210.4, 'fail', 'Charlie'),
  ('preproduction', 1689532820, NULL, 'pending', 'David'),
  ('preproduction', 1689532821, 90.2, 'success', 'Eve'),
  ('preproduction', 1689532822, 60.1, 'fail', 'Frank'),
  ('preproduction', 1689532823, NULL, 'pending', 'David'),
  ('preproduction', 1689532824, 75.4, 'success', 'Eve'),
  ('preproduction', 1689532825, 45.6, 'fail', 'Frank'),
  ('preproduction', 1689532826, NULL, 'pending', 'David'),
  ('preproduction', 1689532827, 100.1, 'success', 'Eve'),
  ('preproduction', 1689532828, 30.8, 'fail', 'Frank'),
  ('preproduction', 1689532829, NULL, 'pending', 'David, Eve'),
  ('preproduction', 1689532830, 120.5, 'success', 'Frank'),
  ('preproduction', 1689532831, 90.2, 'fail', 'David'),
  ('preproduction', 1689532832, NULL, 'pending', 'Eve'),
  ('preproduction', 1689532833, 150.3, 'success', 'Frank'),
  ('preproduction', 1689532834, 75.4, 'fail', 'David'),
  ('preproduction', 1689532835, NULL, 'pending', 'Eve'),
  ('preproduction', 1689532836, 180.2, 'success', 'Frank'),
  ('preproduction', 1689532837, 100.1, 'fail', 'David'),
  ('preproduction', 1689532838, NULL, 'pending', 'Eve');

INSERT OR IGNORE INTO activity (timestamp, value, event) VALUES
  (1689532800, 1523, NULL),
  (1689532850, 2789, 'Alice'),
  (1689532900, 3640, NULL),
  (1689533000, 2150, NULL),
  (1689533100, 4235, 'Bob'),
  (1689533200, 1980, NULL),
  (1689533300, 2876, NULL),
  (1689533400, 3125, 'Charlie'),
  (1689533600, 2301, NULL),
  (1689533800, 1450, NULL),
  (1689534000, 3800, 'Alice'),
  (1689534200, 2675, NULL),
  (1689534400, 1999, NULL),
  (1689534600, 3345, 'Bob'),
  (1689534800, 2750, NULL),
  (1689535000, 1600, NULL),
  (1689535200, 4002, 'Charlie'),
  (1689535400, 2890, NULL),
  (1689535600, 3150, NULL),
  (1689535800, 4501, NULL),
  (1689536000, 1200, 'David'),
  (1689536200, 1785, NULL),
  (1689536400, 2450, NULL),
  (1689536600, 3678, 'Eve'),
  (1689536800, 2903, NULL),
  (1689537000, 1504, NULL),
  (1689537200, 2300, 'Frank'),
  (1689537400, 3450, NULL),
  (1689537600, 1988, NULL),
  (1689537800, 2800, NULL),
  (1689538000, 1605, 'David'),
  (1689538200, 2200, NULL),
  (1689538400, 2756, NULL),
  (1689538600, 3120, 'Eve'),
  (1689538800, 2401, NULL),
  (1689539000, 1985, NULL),
  (1689539200, 3500, 'Frank'),
  (1689539400, 2102, NULL),
  (1689539600, 2901, NULL),
  (1689539800, 3003, NULL);

INSERT OR IGNORE INTO statistics (label, value, day) VALUES
  ('Merged Branches', 42, floor(unixepoch() / (24 * 60 * 60))),
  ('Support Messages', 69, floor(unixepoch() / (24 * 60 * 60))),
  ('Tasks Planned', 37, floor(unixepoch() / (24 * 60 * 60)));