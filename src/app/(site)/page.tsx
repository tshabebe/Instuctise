import { Button } from "@/primitives/button";

export default function LandingPage() {
    return <div className="pt-2">
        <header>
            <div className="container flex items-center justify-between gap-2">
                <div>Insturctise</div>
                <div className="ml-auto">features</div>
                <div>blog</div>
                <Button size={'sm'}>sign up</Button>
           </div>
        </header>
    </div>
}