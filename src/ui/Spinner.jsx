import { bouncy } from "ldrs";

bouncy.register();

function Spinner({ color = "--yellow", size = "30" }) {
  return (
    <>
      <l-bouncy size={size} speed="1.8" color={`var(${color})`}></l-bouncy>
    </>
  );
}

export default Spinner;
