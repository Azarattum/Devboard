# Devboard

A dashboard for developers to monitor project activity. Dynamic configuration supports parsing slack messages or dispatching periodic web requests.

![](./docs/demo.png)

### Setup
Create a configuration `config.ts` file in the root of the project. The configuration follows schema defined in [src/types/config.ts](./src/types/config.ts). Here is an example of what it might look like (all values and tokens are AI generated):
```ts
import type { Config } from "~/types/config";

export const config: Config = {
  slack: {
    appToken:
      "xapp-1-B12JK8K9DQA-9876543210-zyxwvutsrqponmlkjihgfedcba9876543210",
    token: "xoxb-1234567890-0987654321098-abcdef123456ghijklmnopqrs",
  },

  builds: {
    development: {
      success: {
        match: /completed<[^>]+>\s\((\w+)\)/,
        channel: "C3XY12AB34",
        extra: "mentioned",
        user: "U87654321",
        exclude: ["-test"],
        include: ["-release"],
        capture: 1,
      },
      fail: {
        match: /failure<[^>]+>\s\((\w+)\)/,
        channel: "C3XY34AB56",
        extra: "mentioned",
        user: "U87654321",
        exclude: ["-test"],
        include: ["-release"],
        capture: 1,
      },
      pending: {
        match: /build initiated/,
        channel: "C3XY34AB56",
        extra: "mentioned",
        user: "U87654321",
        exclude: ["-test"],
        include: ["-release"],
      },
    },
    preproduction: {
      success: {
        match: /completed<[^>]+>\s\((\w+)\)/,
        include: ["-release", "-live"],
        channel: "C3XY34AB56",
        extra: "mentioned",
        user: "U87654321",
        capture: 1,
      },
      fail: {
        match: /failure<[^>]+>\s\((\w+)\)/,
        include: ["-release", "-live"],
        channel: "C3XY34AB56",
        extra: "mentioned",
        user: "U87654321",
        capture: 1,
      },
      pending: {
        match: /build initiated/,
        include: ["-release", "-live"],
        channel: "C3XY34AB56",
        extra: "mentioned",
        user: "U87654321",
      },
    },
  },
  activity: {
    idle: {
      match: /class="status_active\b[^"]*"[^>]*>\s*([0-9]+)/,
      url: "https://example.org/status",
      interval: 15 * 60_000,
      capture: 1,
    },
    event: {
      channel: "C0456XYZ890",
      match: /(\s|\S)+/,
      capture: "extra",
      extra: "author",
    },
  },
  statistics: {
    "Merged Branches": {
      match: /<@[A-Z0-9]+>/g,
      channel: "G1XY2Z3AB4",
      include: ["done"],
    },
    "Support Messages": {
      channel: "C0456XYZ890",
      match: /(\s|\S)+/g,
    },
    "Tasks Planned": {
      channel: "C7XYZ1234L",
      match: /`[^`]+`/g,
    },
  },
};
```

Install packages, init database, build project, run:
```sh
bun install
bun db:push
bun run build
bun start
```

Optionally there is also `mock.sql` file which contains fake data to try out the dashboard.