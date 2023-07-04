import { Collapse } from './collapse';
import { imagesLazyLoad } from './utils';
import { scroller } from './locomitive-gsap.adapter';
import { runAnimations } from './animation';
import { ScrollTrigger } from 'gsap/all';
import autosize from 'autosize';

document.addEventListener('DOMContentLoaded', () => {
  imagesLazyLoad();
  runAnimations();

  const faqCollapse = new Collapse('#faq-collapse-group', {
    onOpen: () => {
      setTimeout(() => scroller.update(), 350);
    },
    onClose: () => {
      setTimeout(() => scroller.update(), 350);
    }
  });

  // Inputs
  const textFileInput = document.querySelector('.text-file-input [type="file"]');
  const fileInfo = document.querySelector('.file-info__item');
  const fileInfoText = document.querySelector('.file-info span');

  if (textFileInput) textFileInput.addEventListener('change', (ev) => {
    let filename = ev.target.value.split(String.fromCharCode(92));
    fileInfoText.innerHTML = filename[filename.length - 1];

    if (fileInfoText.innerText.length > 0) {
      fileInfo.classList.remove('hidden');
      return;
    }
    fileInfo.classList.add('hidden');
  });

  const fileInfoClose = document.querySelector('.cross-icon');
  if (fileInfoClose) fileInfoClose.addEventListener('click', () => {
    textFileInput.value = '';

    fileInfo.classList.add('hidden');
    fileInfoText.innerHTML = '';
  });

  // Textarea size by content
  const textAreas = document.querySelectorAll('textarea');
  textAreas.forEach((t) => {
    autosize(t);
    t.addEventListener('autosize:resized', () => {
      ScrollTrigger.refresh();
    });
  }); 
});
