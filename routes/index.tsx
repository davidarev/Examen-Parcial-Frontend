import FormIndex from "../components/FormIndex.tsx";
import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';
import { Phone } from "../types.ts";

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, Phone>) => {
        const API_KEY = Deno.env.get("API_KEY");
        if(!API_KEY) throw new Error("ERROR: Falta el API KEY");
        
        const url2 = new URL(req.url);
        const number = url2.searchParams.get("number");
        if(!number) return new Response("Falta el numero");
        const url = `https://api.api-ninjas.com/v1/validatephone?number=${number}`
        const data = await fetch(url, {
            headers: {
                'X-Api-Key': API_KEY
            },
        });
        if(data.status !== 200) throw new Error("ERROR: No se encontró el telefono");
        const response: Promise<Phone> = data.json();
        const country = (await response).country;
        const is_valid = (await response).is_valid;

        const phone = {
            number,
            country,
            is_valid,
        }

        return ctx.render(phone);
    }
}

const Page = (props: PageProps<Phone>) => {
    return (
        <>
            <FormIndex />
            {props.data.number && <div>
                <p>Numero: {props.data.number}</p>
                <p>Pais: <a href={`/country/${props.data.country}`}>{props.data.country}</a></p>
            </div>
            }
            
        </>
    )
}

export default Page;
