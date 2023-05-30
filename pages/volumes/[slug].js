import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { volumes } from "../../lib/data";
import styled from "styled-components";

export default function VolumeDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const volumeIndex = volumes.findIndex((volume) => volume.slug === slug);

  const volume = volumes[volumeIndex];
  const previousVolume = volumes[volumeIndex - 1];
  const nextVolume = volumes[volumeIndex + 1];

  if (!volume) {
    return null;
  }

  //add the color prop from the volume
  const { title, description, cover, books, color } = volume;

  return (
    <StyledPageDiv>
      <Link href="/volumes">← All Volumes</Link>
      <h1>{title}</h1>
      <p>{description}</p>
      {/*Add the prop here */}
      <StyledVolumeDiv backgroundColor={color}>
        <StyledBookUl>
          {books.map(({ ordinal, title }) => (
            <StyledLiFlex key={title}>
              {ordinal}: <strong>{title}</strong>
            </StyledLiFlex>
          ))}
        </StyledBookUl>

        <Image
          src={cover}
          alt={`Cover image of ${title}`}
          width={140}
          height={230}
        />
      </StyledVolumeDiv>
      {previousVolume ? (
        <div>
          <Link href={`/volumes/${previousVolume.slug}`}>
            ← Previous Volume: {previousVolume.title}
          </Link>
        </div>
      ) : null}
      {nextVolume ? (
        <div>
          <Link href={`/volumes/${nextVolume.slug}`}>
            Next Volume: {nextVolume.title} →
          </Link>
        </div>
      ) : null}
    </StyledPageDiv>
  );
}

const StyledVolumeDiv = styled.div`
  //use the prop here to change the background
  background-color: ${(props) => {
    if (!props.backgroundColor) {
      return "white";
    }
    return props.backgroundColor;
  }};

  color: white;
  display: flex;
  padding: 24px;
`;
//add with to the page
const StyledPageDiv = styled.div`
  width: 390px;
`;
//add align to the ul
const StyledBookUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
`;

//add flex column to li

const StyledLiFlex = styled.li`
  display: flex;
  flex-direction: column;
`;
