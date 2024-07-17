const payload = [
    { _id: '1' },
    { _id: '2' },
    { _id: '3' },
]

const id = payload.map(item => ({ _id: item._id }))

console.log(id);