import Auth0Lock from 'auth0-lock'
import jwtDecode from 'jwt-decode'
import queryString from 'query-string'

import nuxtConfig from '~/nuxt.config'

const config = nuxtConfig.auth0

class Auth0Util {
  showLock(container) {
    const lock = new Auth0Lock(
      config.clientID,  // auth0のクライアントID
      config.domain,    // auth0のドメイン名
      {
        container,
        closable: false,
        auth: {
          responseType: 'token id_token',
          redirectUrl: this.getBaseUrl() + '/callback',  // 認証完了後のリダイレクト先
          params: {
            scope: 'openid profile email'
          }
        }
      }
    )

    lock.show()
  }

  getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`
  }

  getQueryParams() {
    return queryString.parse(location.hash)
  }

  // 認証情報登録
  setToken({access_token, id_token, expires_in}) {
    const localStorage = window.localStorage
    localStorage.setItem('accessToken', access_token)  // auth0へのアクセス情報
    localStorage.setItem('idToken', id_token)  // scopeで指定した情報
    localStorage.setItem('expiresAt', expires_in * 1000 + new Date().getTime())  // 有効期限設定
    localStorage.setItem('user', JSON.stringify(jwtDecode(id_token)))
  }

  // 認証情報削除
  unsetToken() {
    const localStorage = window.localStorage
    localStorage.removeItem('accessToken')  // auth0へのアクセス情報
    localStorage.removeItem('idToken')  // scopeで指定した情報
    localStorage.removeItem('expiresAt')  // 有効期限設定
    localStorage.removeItem('user')
  }

  setTokenByQuery() {
    this.setToken(this.getQueryParams())
  }

  // 認証トークンの有効期限チェック
  isAuthenticated() {
    const expiresAt = window.localStorage.getItem('expiresAt')
    return new Date().getTime() < expiresAt
  }
}

// inject => this.$auth0経由での呼び出しを可能に
export default (context, inject) => {
  inject('auth0', new Auth0Util)
}
