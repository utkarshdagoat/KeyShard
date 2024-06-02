
import { useNavigate } from 'react-router-dom';
import styles from './pages.module.css';
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate()
  return (
    <>
      <div
        className={`w-full h-screen flex flex-col gap-2 justify-center items-center ${styles.wave_bg}`}
      >
          <p className="text-xl text-muted-foreground font-semibold">
            Welcome to
          </p>
          <h1 className="text-8xl font-black uppercase text-pink-500">
            Key<span className="text-yellow-400">Shard</span>
          </h1>
          <p className="text-xl font-semibold text-pink-900/60">
            A Distributed Key Gerneration platform using FROST scheme
          </p>
          <Button size={"lg"} onClick={(e)=>navigate("/demo")}>See Demo :)</Button>

      </div>
    </>
  );
}
