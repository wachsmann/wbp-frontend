
import crudReducerFactory from "./factories/crudReducerFactory";

const factory = new crudReducerFactory("routing", "routing")

export const reducer = factory.reducer
export const actions = factory.actions

export default reducer