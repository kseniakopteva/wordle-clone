export default function Footer() {
  return (
    <div className="mt-auto flex flex-col items-baseline p-3 md:flex-row md:justify-between">
      <div>
        Hey. Here is my github:{" "}
        <a className="underline" href="https://github.com/kseniakopteva">
          Ksenia Kopteva's Github.
        </a>
      </div>
      <div>
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
