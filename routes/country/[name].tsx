import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import GetCountry from "../../components/GetCountry.tsx";

type Country = {
    name: string,
    capital: string,
}

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, Country>) => {
        const API_KEY = Deno.env.get("API_KEY");
        if(!API_KEY) throw new Error("ERROR: Falta el API KEY");

        const name = "Spain";

        const url = `https://api.api-ninjas.com/v1/country?name=${name}`
        const data = await fetch(url, {
            headers: {
                'X-Api-Key': API_KEY
            },
        });
        if(data.status !== 200) throw new Error("ERROR: Error de conectavidad");
        const response: Promise<Country> = data.json();
        const capital = (await response).capital

        const country = {
            name,
            capital
        }

        return ctx.render(country);
    }
}


const Page = (props: PageProps<Country>) => {
    return (
        <>
            <div>
                <p>Pais: {props.data.name}</p>
                <p>Capital: {props.data.capital}</p>
            </div>
        </>
    )
}

export default Page;
