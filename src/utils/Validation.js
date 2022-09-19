// Validacion para alfabeto latinoamericano (tildes y ñ)
export const HandleKeyPress = (event) => {
  let char = String.fromCharCode(event.charCode)
  if (/^[a-zA-ZÀ-ÿ\u00f1\u00d1\u00E0-\u00FC\s]*$/i.test(char)) {
    return true
  } else {
    event.preventDefault()
  }
}
// Validacion para espacios, solo se permite un expacio por palabra
export const HandleKeyDown = (event) => {
  if (event.target.value[0] === " ") {
    event.target.value = event.target.value.replace(/^\s*/, "")
  }
  event.target.value = event.target.value.replace(/\s+$/, " ")
}

// Validacion para correos sin espacios
export const HandleKeyDownWithoutSpace = (event) => {
  // event.target.value = event.target.value.replace(/\s+$/, "")
  let char = String.fromCharCode(event.charCode)
  if (!/^\s+$/i.test(char)) {
    return true
  } else {
    event.preventDefault()
  }
}

// Validacion solo se permiten escribir numberos
export const HandleKeyDownOnlyNumbers = (event) => {
  let char = String.fromCharCode(event.charCode)
  if (/^[0-9\b]+$/i.test(char)) {
    return true
  } else {
    event.preventDefault()
  }
}

// Validacion para numbero de telefono
export const HandleKeyDownPhoneNumber = (event) => {
  const onlyNums = event.target.value.replace(/[^0-9]/g, "")
  if (onlyNums.length < 10) {
    event.target.value = onlyNums
  } else if (onlyNums.length === 10) {
    event.target.value = onlyNums.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1) $2-$3"
    )
  }
}
