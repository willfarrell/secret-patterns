const chai = require('chai')
chai.use(require('chai-match'))
const expect = chai.expect

const patterns = require('../build/regexes.json')

let regexp = new RegExp()
describe('AWS', function () {
  describe('Access Key ID Value', function () {
    beforeEach(() => {
      regexp = new RegExp(patterns['AWS Access Key ID Value'])
    })
    it('should catch', function () {
      expect('AKIAIOSFODNN7EXAMPLE').to.match(regexp)
      expect('AROAIOSFODNN7EXAMPLE').to.match(regexp)
      expect('ANVAIOSFODNN7EXAMPLE').to.match(regexp)
      expect('A3TAIOSFODNN7EXAMPLE').to.match(regexp)
    })

    it('should ignore', function () {
      expect('PASSWORD').to.not.match(regexp)
    })
  })

  describe('Account ID', function () {
    beforeEach(() => {
      regexp = new RegExp(patterns['AWS Account ID'])
    })
    it('should catch', function () {
      const value = '123456789012'
      // ENV
      expect(`AWS_ACCOUNT_ID=${value}`).to.match(regexp)

      expect(`aws_account_id=${value}`).to.match(regexp)
      expect(`aws_account_id = ${value}`).to.match(regexp)
      // SDK
      expect(`"accountId": "${value}"`).to.match(regexp)
      expect(`accountId: "${value}"`).to.match(regexp)
      expect(`accountId = "${value}"`).to.match(regexp)
    })

    it('should ignore', function () {
      expect('PASSWORD').to.not.match(regexp)
      expect('ACCOUNT_ID=0123456789').to.not.match(regexp)
    })
  })

  describe('Access Key ID', function () {
    beforeEach(() => {
      regexp = new RegExp(patterns['AWS Access Key ID'])
    })
    it('should catch', function () {
      const value = 'AKIAIOSFODNN7EXAMPLE'
      // ENV
      expect(`AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE`).to.match(regexp)
      // ~/.aws/credentials
      expect(`aws_access_key_id=${value}`).to.match(regexp)
      expect(`aws_access_key_id = ${value}`).to.match(regexp)
      // SDK
      expect(`"accessKeyId": "${value}"`).to.match(regexp)
      expect(`accessKeyId: "${value}"`).to.match(regexp)
      expect(`accessKeyId = "${value}"`).to.match(regexp)
    })

    it('should ignore', function () {
      expect('PASSWORD').to.not.match(regexp)

    })
  })

  describe('Secret Access Key', function () {
    beforeEach(() => {
      regexp = new RegExp(patterns['AWS Secret Access Key'])
    })
    it('should catch', function () {
      const value = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
      // ENV
      expect(`AWS_SECRET_ACCESS_KEY=${value}`).to.match(regexp)
      // ~/.aws/credentials
      expect(`aws_secret_access_key=${value}`).to.match(regexp)
      expect(`aws_secret_access_key = ${value}`).to.match(regexp)
      // SDK
      expect(`"secretAccessKey": "${value}"`).to.match(regexp)
      expect(`secretAccessKey: "${value}"`).to.match(regexp)
      expect(`secretAccessKey = "${value}"`).to.match(regexp)
    })

    it('should ignore', function () {
      expect('PASSWORD').to.not.match(regexp)

    })
  })

  describe('Session Token', function () {
    beforeEach(() => {
      regexp = new RegExp(patterns['AWS Session Token'])
    })
    it('should catch', function () {
      const value = 'AQoEXAMPLEH4aoAH0gNCAPyJxz4BlCFFxWNE1OPTgk5TthT+FvwqnKwRcOIfrRh3c/LTo6UDdyJwOOvEVPvLXCrrrUtdnniCEXAMPLE/IvU1dYUg2RVAJBanLiHb4IgRmpRV3zrkuWJOgQs8IZZaIv2BXIa2R4OlgkBN9bkUDNCJiBeb/AXlzBBko7b15fjrBs2+cTQtpZ3CYWFXG8C5zqx37wnOE49mRl/+OtkIKGO7fAE'
      // ENV
      expect(`AWS_SESSION_TOKEN=${value}`).to.match(regexp)
      // ~/.aws/credentials

      // SDK
      expect(`"sessionToken": "${value}"`).to.match(regexp)
      expect(`sessionToken: "${value}"`).to.match(regexp)
      expect(`sessionToken = "${value}"`).to.match(regexp)
    })

    it('should ignore', function () {
      expect('PASSWORD').to.not.match(regexp)

    })
  })
})
