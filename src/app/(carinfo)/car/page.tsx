import CarCatalog from "@/components/CarCatalog";
import CarPanel from "@/components/CarPanel";
import getCars from "@/libs/getCars";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";

export default function Car() {
    const cars = getCars();
    
    return(
        <main className="text-center p-5">
            <h1 className="font-medium text-xl">Select Your Travel Partner</h1>
            <Suspense fallback={
                <p>
                    Loading... <LinearProgress/>
                </p>
            }>
                <CarCatalog carJson={cars}/>
            </Suspense>
            
            <hr className="my-10"/>
            <h1 className="text-xl font-medium">TRY Client-side Car Panel</h1>
            <CarPanel/>
        </main>
    );
}

export async function generateStaticParams() {
    return [{cid:'001'}, {cid:'002'}, {cid:'003'}, {cid:'004'}];
}