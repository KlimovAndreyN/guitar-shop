type OfferGalleryProps = {
  images: string[];
}

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((image, index) => {
          const key = `img-${index}`;

          return (
            <div className="offer__image-wrapper" key={key}>
              <img className="offer__image" src={image} alt="Photo studio" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OfferGallery;
