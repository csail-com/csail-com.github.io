import Wrapper from "./Wrapper";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Wrapper>
      <h1>My Page</h1>
    </Wrapper>
  );
}
