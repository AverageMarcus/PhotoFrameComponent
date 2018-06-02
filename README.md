# PhotoFrameComponent
Web Component based PhotoFrame using [justified-layout](https://github.com/flickr/justified-layout) from [Flickr](https://github.com/flickr)

## Example usage

Source: https://glitch.com/edit/#!/photo-frame-component?path=index.html

Live Demo: https://photo-frame-component.glitch.me/

The page will slowly scroll through all images and then scroll back up once it reaches the bottom (on repeat). Clicking/tapping anywhere on the page will toggle fullscreen mode.

## Usage

1. Include a script reference to the module:
```js
<script type="module" src="https://unpkg.com/@averagemarcus/photo-frame?module"></script>
```
2. Add a `<photo-frame>` element to your page and fill it with images:
```html
<photo-frame>
  <img src="https://placekitten.com/200/300">
  <img src="https://placekitten.com/200/300">
  <img src="https://placekitten.com/1025/800">
  <img src="https://placekitten.com/500/500">
  <img src="https://placekitten.com/250/250">
  <img src="https://placekitten.com/200/300">
</photo-frame>
```

## Configuration

**spacing** - Increase the space between images
```html
<photo-frame spacing="10">
  <img src="https://placekitten.com/200/300">
  <img src="https://placekitten.com/200/300">
  <img src="https://placekitten.com/1025/800">
  <img src="https://placekitten.com/500/500">
  <img src="https://placekitten.com/250/250">
  <img src="https://placekitten.com/200/300">
</photo-frame>
```

## Contributions

Contributions welcome!

Found a bug? [File an issue](https://github.com/AverageMarcus/PhotoFrameComponent/issues/new)

## Running locally

Once checked out:
1. `npm install`
2. `npm run build`
3. `npm run serve`
