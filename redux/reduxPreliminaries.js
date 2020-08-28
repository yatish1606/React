console.clear()

// each action creator returns a js object
const createPolicy = (name, amount) => {
  return {
    type : 'CREATE_POLICY',
    payload : {
      name : name,
      amount : amount
    }
  }
}

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload : {
      name : name
    }
  }
}

const claimInsurance = (name, amountToClaim) => {
  return {
    type: 'CREATE_CLAIM',
    payload : {
      name : name,
      amountToClaim : amountToClaim
    }
  }
}

// create Reducers

const claimsHistory = (oldList = [], action) => action.type === 'CREATE_CLAIM' 
    ? [...oldList, action.payload] 
    : oldList

const accountsDepartment = (bagOfMoney = 100, action) => action.type === 'CREATE_CLAIM' 
    ? bagOfMoney - action.payload.amountToClaim 
    : action.type === 'CREATE_POLICY' 
    ? bagOfMoney + action.payload.amount 
    : bagOfMoney

const policiesDepartment = (listOfPolicies = [], action) => action.type === 'CREATE_POLICY' 
    ? [...listOfPolicies, action.payload.name] 
    : action.type === 'DELETE_POLICY' 
    ? [listOfPolicies.filter(name => name != action.payload.name)] 
    : listOfPolicies 

const { createStore, combineReducers } = Redux

const allDepartments = combineReducers({
  claimsHistory : claimsHistory,
  accountsDepartment : accountsDepartment,
  policiesDepartment : policiesDepartment
})

const store = createStore(allDepartments)

const action = createPolicy('Alex', 20)
store.dispatch(action)
store.dispatch(claimInsurance('Alex', 10))

console.log(store.getState())