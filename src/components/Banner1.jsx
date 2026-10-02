import { useNavigate } from "react-router-dom";
import mascotaBanner from "../assets/mascota_banner.png"; 

export default function Banner() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 my-8">
      <div 
        onClick={() => navigate("/OurStore")}
        className="cursor-pointer overflow-hidden rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 transform "
        title="Ver todas las ofertas en la tienda"
      >
        <img
          src={mascotaBanner} 
          alt="Todo lo que quieres en un solo clic - Chambealo"
          className="w-full h-auto object-cover block"
        />
      </div>
    </section>
  );
}