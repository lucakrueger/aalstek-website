let test1 = (params) => {
    console.log(params.a, params.b, params.c)
}

let test2 = ({a, b, c}) => {
    console.log(a, b, c)
}

test1({a: 10, b: 'Hello'})
test2({a: 11, b: 'World'})