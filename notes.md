# TODO

- support proxy
- test IgResponse for errors
- form Serializer
  - nested
    supported_capabilities_new: this.client.state.supportedCapabilities,
- same in qs Serializer
- tough cookie-fix
  similar commit https://github.com/3846masa/axios-cookiejar-support/commit/6025b5cdf387350cb56afb462a45b604ae7b34ac
  pr: https://github.com/3846masa/axios-cookiejar-support/issues/112
  test: https://github.com/3846masa/axios-cookiejar-support/commit/d5aa3e53c52512b2b4f780da2c8e71a3a707611a
  change location https://github.com/3846masa/axios-cookiejar-support/blob/master/lib/interceptors/response.mjs#L24
- test requests with non json body, ones not using form prop
- throw if json stringify failed for success status?
- test media request
- axios & cookie support default import types
- replace crypto? https://github.com/brix/crypto-js
- fix broken this.cookieJar['_jar']
