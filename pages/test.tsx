type TEST = {
    name: string
}
const testpage = () => {
    const test = {
        name: "Marco",
        age: 25
    } as TEST
    return <div>
        <h1>test</h1>
    </div>
}
export default testpage