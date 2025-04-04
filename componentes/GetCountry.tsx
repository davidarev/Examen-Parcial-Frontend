import { FunctionalComponent } from "preact/src/index.d.ts";

type Country = {
    name: string,
    capital: string,
}

const GetCountry: FunctionalComponent<Country> = (props) => {
    return (
        <>
            <div>
                <p>Pais: {props.name}</p>
                <p>Capital: {props.capital}</p>
            </div>
        </>
    )
}

export default GetCountry;