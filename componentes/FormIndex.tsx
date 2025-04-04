import { FunctionalComponent } from "preact/src/index.d.ts";

const FormIndex: FunctionalComponent = () => {
    return (
        <form method="GET" action="/">
            <input type="text" placeholder="Introduce un telefono" name="number" />
            <button type="submit">BUSCA TELEFONO</button>
        </form>
    )
}

export default FormIndex;