/**
 * Created by LiuTao on 2018/2/7.
 */
export function addClass (el, classNmae) {
  if (hasClass(el, classNmae)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(classNmae)
  el.className = newClass.join(' ')
}
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|s)')
  return reg.test(el.className)
}
export function getData (el, name, value) {
  const prefix = 'data-'
  if (value) {
    return el.setAttribute(prefix + name, value)
  }
  return el.getAttribute(prefix + name)
}
