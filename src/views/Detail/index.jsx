import { useParams } from "react-router"

function Index() {
  const { id } = useParams();

  return (
      <div className="detail">
        Details id: {id}
      </div>
  );
}

export default Index;
