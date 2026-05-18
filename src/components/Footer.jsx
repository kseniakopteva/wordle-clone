export default function Footer() {
  return (
    <div className="mt-auto flex flex-col items-baseline text-xs sm:text-sm md:flex-row md:justify-between md:text-base">
      <div className="absolute bottom-3 left-3">
        Hey. Here is my github:{" "}
        <a className="underline" href="https://github.com/kseniakopteva">
          Ksenia Kopteva's Github.
        </a>
      </div>
      <div className="absolute right-3 bottom-3">
        <a
          className="underline"
          href="https://unsplash.com/photos/a-blurry-photo-of-a-white-background-GJKx5lhwU3M?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Photo
        </a>{" "}
        and{" "}
        <a
          className="underline"
          href="https://unsplash.com/photos/a-blurry-photo-of-a-black-and-white-background-aUNaGmOIE64?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          photo
        </a>{" "}
        by{" "}
        <a
          className="underline"
          href="https://unsplash.com/@fakurian?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Milad Fakurian
        </a>{" "}
        on <a href="https://unsplash.com/">Unsplash</a>
      </div>
    </div>
  );
}
