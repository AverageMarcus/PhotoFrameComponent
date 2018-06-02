function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

import { html, LitElement } from '@polymer/lit-element'
import { default as justifiedLayout } from 'justified-layout';

class PhotoFrame extends LitElement {

  static get properties() {
    return {
      spacing: {
        type: Number,
        attrName: 'spacing'
      }
    };
  }

  constructor() {
    super();
    const self = this;
    const images = [...this.querySelectorAll('img')];
    this.innerHTML = '';
    this.images = [];

    Promise.all(images.map(image => {
      return new Promise(resolve => {
        const done = ({ width, height, src }) => {
          self.images.push({ width, height, src });
          return resolve();
        };

        if (image.width && image.height) {
          done(image);
        } else {
          image.onload = function() {
            done(image);
          };
        }
      });
    }))
    .then(() => {
      this._requestRender();
    });

    this.addEventListener('click', toggleFullScreen);
  }

  _render({ spacing }) {
    const config = {
      // "fullWidthBreakoutRowCadence": 3,
      "containerWidth":  window.innerWidth || document.body.clientWidth,
      "boxSpacing": spacing || 3,
      "showWidows": false
    };

    const geometry = justifiedLayout(this.images, config);

    const boxes = geometry.boxes.map((box, i) => {
      return html`
        <div class="box" style="width: ${box.width}px; height: ${box.height}px; top: ${box.top}px; left: ${box.left}px">
          <img src="${this.images[i].src}" />
        </div>
        `;
    });

    return html`
      <style>
      .images {
        position: relative;
        width: 100%;
        animation-duration: ${(geometry.containerHeight - window.innerHeight) / 10}s;
        animation-name: scroll;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-timing-function: linear;
      }
      .box {
        position: absolute;
      }
      .box img {
        width: 100%;
        height: 100%;
      }

      @-webkit-keyframes scroll {
        from {
          margin-top: 0;
        }
        to {
          margin-top:-${geometry.containerHeight - window.innerHeight}px;
        }
      }

      </style>
      <div class="images" style="height:${geometry.containerHeight}px">
        ${boxes}
      </div>
    `;
  }

}

customElements.define('photo-frame', PhotoFrame);
