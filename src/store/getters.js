export default {
  money (state) {
    let result = 0
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].Bol) {
        result += (state.carts[i].num * state.carts[i].price)
      }
    }
    return result
  },
  num (state) {
    let result = 0
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].Bol) {
        result += (state.carts[i].num)
      }
    }
    return result
  }
}
