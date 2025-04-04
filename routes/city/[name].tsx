import { Handlers, FreshContext, PageProps } from '$fresh/server.ts';

type City = {
    name: string,
    country: string,
    latitude: string,
    longitude: string,
    weather: string
}

type Weather = {
    temp: string,
}

export const handler: Handlers = {
    GET: async (_req: Request, ctx: FreshContext<unknown, City>) => {
        const API_KEY = Deno.env.get("API_KEY");
        if(!API_KEY) throw new Error("ERROR: Falta el API KEY");

        const name = "Madrid";

        const url = `https://api.api-ninjas.com/v1/city?name=${name}`
        const data = await fetch(url, {
            headers: {
                'X-Api-Key': API_KEY
            },
        });
        if(data.status !== 200) throw new Error("ERROR: Error de conectavidad API City");
        const response: Promise<City> = data.json();
        const country = (await response).country
        const latitude = (await response).latitude
        const longitude = (await response).longitude

        const url_temp = `https://api.api-ninjas.com/v1/city?latitude=${latitude}&longitude=${longitude}`
        const data_temp = await fetch(url_temp, {
            headers: {
                'X-Api-Key': API_KEY
            },
        });
        if(data_temp.status !== 200) throw new Error("ERROR: Error de conectavidad en API Wather");
        const response_temp: Promise<Weather> = data.json();
        const weather = (await response_temp).temp


        const city = {
            name,
            country,
            latitude,
            longitude,
            weather
        }

        return ctx.render(city);
    }
}


const Page = (props: PageProps<City>) => {
    return (
        <>
            <div>
                <p>Ciudad: {props.data.name}</p>
                <p>Pais: {props.data.country}</p>
                <p>Temp: {props.data.weather}</p>
            </div>
        </>
    )
}

export default Page;
