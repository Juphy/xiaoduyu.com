import Ajax from '../common/ajax'
import Keydown from '../common/keydown'

export function showSign(e) {

  if (e) e.stopPropagation()

  return dispatch => {

    Keydown.add('sign', (keyList)=>{
      if (keyList.indexOf(27) != -1) {
        dispatch(hideSign())
      }
    })

    dispatch({ type: 'SET_GO_BACK', goBack: false })
    dispatch({ type: 'SHOW_SIGN' })
  }
}

export function hideSign() {
  return dispatch => {
    Keydown.remove('sign')
    dispatch({ type: 'SET_GO_BACK', goBack: true })
    dispatch({ type: 'HIDE_SIGN' })
  }
}

export function addAccessToken({ expires, access_token }) {
  return { type: 'ADD_ACCESS_TOKEN', expires, access_token }
}

export function signout() {
  return { type: 'REMOVE_ACCESS_TOKEN' }
}

// 登录
export function signin(email, password, callback) {
  return dispatch => {

    return Ajax({
      url: '/signin',
      type: 'post',
      data: {
        email: email,
        password: password
      },
      callback: (res) => {

        if (res && res.success) {
          dispatch(addAccessToken(res.data))
        }
        callback(res ? res.success : false, res)
      }
    })

  }
}

// 注册
export function signup(data, callback) {
  return dispatch => {

    Ajax({
      url: '/signup',
      type: 'post',
      data: data,
      callback: (result) => {
        if (result.success) {
          callback(null, result)
        } else {
          callback(true, result)
        }
      }
    })

  }
}


// 注册邮箱验证
export function signupEmailVerify(code, callback) {
  return dispatch => {

    Ajax({
      url: '/signup-email-verify',
      type: 'post',
      data: { code: code },
      callback: (result) => {
        if (result.success) {
          callback(null, result)
        } else {
          callback(true, result)
        }
      }
    })

  }
}
