# nats-mon

A realtime web based NATS monitor

## Table of contents

- [Quick Start](#quick-start)
- [Build status](#build-status)
- [Coverage](#coverage)
- [Screenshot](#screenshot)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Quick start

Install nats-mon
```
git clone https://github.com/repejota/nats-mon.git
cd  nats-mon
npm install
```

Run nats-mon
```
npm start
```

You will also need gnatsd running with monitoring enabled:
```
./gnatsd -m 8222
```

Now you can open nats-mon on your browser through http://localhost:3000

## Environment variables

nats-mon support the following environment variables:

* `NATSMON_SERVER_ADDRESS` : Server address, by default `localhost`.
* `NATSMON_SERVER_PORT` : Server port, by default `3000`.

## More options

nats-mon support the following options and command line flags:

This flags, overrides the values from the environment variables above.

```
$ nats-mon --help

  Usage: nats-mon [options]

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --server-address [address]  Server address
    --server-port [port]        Server port
```

## Build status

* Master: [![Build Status](https://travis-ci.org/repejota/nats-mon.svg?branch=master)](https://travis-ci.org/repejota/nats-mon)
* Develop: [![Build Status](https://travis-ci.org/repejota/nats-mon.svg?branch=develop)](https://travis-ci.org/repejota/nats-mon)

## Coverage

* Master: [![Coverage Status](https://coveralls.io/repos/repejota/nats-mon/badge.svg?branch=master&service=github)](https://coveralls.io/github/repejota/nats-mon?branch=master)
* Develop: [![Coverage Status](https://coveralls.io/repos/repejota/nats-mon/badge.svg?branch=develop&service=github)](https://coveralls.io/github/repejota/nats-mon?branch=develop)

## Screenshot

![Alt text](/screenshot.gif?raw=true "Screenshot")

## Bugs and feature requests

Have a bug or a feature request? Please first read the
[issue guidelines](https://github.com/repejota/nats-mon/blob/master/CONTRIBUTING.md#using-the-issue-tracker)
and search for existing and closed issues. If your problem or idea is not
addressed yet,
[please open a new issue](https://github.com/repejota/nats-mon/issues/new).

## Contributing

Please read through our
[contributing guidelines](https://github.com/repejota/nats-mon/blob/master/CONTRIBUTING.md).
Included are directions for opening issues, coding standards, and notes on
development.

Moreover, if your pull request contains patches or features, you must include
relevant unit tests.

## Versioning

For transparency into our release cycle and in striving to maintain backward
compatibility, this project is maintained under
[the Semantic Versioning guidelines](http://semver.org/). Sometimes we screw
up, but we'll adhere to those rules whenever possible.

## Creators

**Raül Pérez**

- <https://twitter.com/repejota>
- <https://github.com/repejota>


**Adrià Cidre**

- <https://twitter.com/adriacidre>
- <https://github.com/adriacidre>

## License

Code and documentation copyright 2015 nats-mon authors.

By contributing your code, you agree to license your contribution under the
[MIT license](LICENSE).
