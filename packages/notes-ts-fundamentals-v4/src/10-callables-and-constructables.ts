//* Callables

interface TwoNumberCalculation {
  (x: number, y: number): number
}

type TwoNumberCalc = (x: number, y: number) => number

const add: TwoNumberCalculation = (a, b) => a + b
const subtract: TwoNumberCalc = (x, y) => x - y

//* `void`

function printFormattedJSON(obj: string[]) {
  console.log(JSON.stringify(obj, null, '  '))
}

const x = printFormattedJSON(['hello', 'world'])

const xx: void = undefined // void type can accept both undefined but not null
const yy: void = null
const zz: null = null // Only null is assignable to null and not undefined or void

function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000)
}
//void in callback means that function can accept any type
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000)
}

const values: number[] = []
invokeInFourSeconds(() => values.push(4)) //Push function returns a number instead of undefined! Error: Type 'undefined' is not assignable to type 'number'.
invokeInFiveSeconds(() => values.push(4)) // void can be used to suggest any defined type is allowed

//* Constructables

interface DateConstructor {
  new (value: number): Date
}

let MyDateConstructor: DateConstructor = Date
const d = new MyDateConstructor(1697923072611)

//* Function overloads

type FormSubmitHandler = (data: FormData) => void
type MessageHandler = (evt: MessageEvent) => void

//function overload 1
function handleMainEvent(
  elem: HTMLFormElement,
  handler: FormSubmitHandler,
): void
//function overload 2
function handleMainEvent(
  elem: HTMLIFrameElement,
  handler: MessageHandler,
): void
//function implementation
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler,
) {
  console.log('handleMainEvent')
}

const myFrame = document.getElementsByTagName('form')[0]
handleMainEvent(myFrame, (val) => {})

// //? Add above handleMainEvent function declaration
// function handleMainEvent(
//     elem: HTMLFormElement,
//     handler: FormSubmitHandler
// )
// function handleMainEvent(
//     elem: HTMLIFrameElement,
//     handler: MessageHandler
// )
// //? Form handler has a specific type now!
// const myForm = document.getElementsByTagName("form")[0]
// handleMainEvent(myForm, (val) => {
// })

//* `this` types

function myClickHandler(this: HTMLButtonElement, event: Event) {
  this.disabled = true
}
myClickHandler(new Event('click')) // maybe ok?


const myButton = document.getElementsByTagName("button")[0]
const boundHandler = myClickHandler.bind(myButton)
boundHandler(new Event("click")) // bound version: ok
myClickHandler.call(myButton, new Event("click")) // also ok

//* Function best practices

//? Explicit function return types
type JSONPrimitive = string | number | boolean | null
type JSONObject = { [k: string]: JSONValue }
type JSONArray = JSONValue[]
type JSONValue = JSONArray | JSONObject | JSONPrimitive

export async function getData(url: string): Promise<{ properties: string[] }>{
    const resp = await fetch(url)
    // if (resp.ok) {
        const data = (await resp.json()) as {
            properties: string[]
        }
        return data
    // }
}

function loadData() {
    getData("https://example.com").then((result) => {
        console.log(result.properties.join(", "))
        //           ^?
    })
}
/**/
export default {}
