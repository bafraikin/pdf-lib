import {
  PDFArray,
  PDFContext,
  PDFDict,
  PDFName,
  PDFPageLeaf,
  PDFPageTree,
  PDFRef,
} from 'src/index';

describe(`PDFPageLeaf`, () => {
  it(`can be constructed directly from a Map and PDFContext`, () => {
    const context = PDFContext.create();
    const dict = new Map();
    const pageTree = PDFPageLeaf.fromMapWithContext(dict, context);

    expect(pageTree).toBeInstanceOf(PDFPageLeaf);
    expect(pageTree.get(PDFName.of('Type'))).toBeUndefined();
    expect(pageTree.get(PDFName.of('Kids'))).toBeUndefined();
    expect(pageTree.get(PDFName.of('Count'))).toBeUndefined();
    expect(pageTree.get(PDFName.of('Parent'))).toBeUndefined();
  });

  it(`is constructed with the correct Type and entries`, () => {
    const context = PDFContext.create();
    const parentRef = PDFRef.of(1);
    const pageTree = PDFPageLeaf.withContextAndParent(context, parentRef);

    expect(pageTree).toBeInstanceOf(PDFPageLeaf);
    expect(pageTree.get(PDFName.of('Type'))).toBe(PDFName.of('Page'));
    expect(pageTree.get(PDFName.of('Parent'))).toBe(parentRef);
    expect(pageTree.get(PDFName.of('Resources'))).toBeInstanceOf(PDFDict);
    expect(pageTree.get(PDFName.of('MediaBox'))).toBeInstanceOf(PDFArray);
  });

  it(`returns its Parent, Contents, Annots, BleedBox, TrimBox, Resources, MediaBox, CropBox, and Rotate entry values when they are references`, () => {
    const context = PDFContext.create();

    const kids = context.obj([]);
    const count = context.obj(1);
    const parent = PDFPageTree.withContextAndKidsAndCount(context, kids, count);
    const parentRef = context.register(parent);

    const contents = context.obj([]);
    const contentsRef = context.register(contents);

    const annots = context.obj([]);
    const annotsRef = context.register(annots);

    const bleedBox = context.obj([]);
    const bleedBoxRef = context.register(bleedBox);

    const trimBox = context.obj([]);
    const trimBoxRef = context.register(trimBox);

    const resources = context.obj({});
    const resourcesRef = context.register(resources);

    const mediaBox = context.obj([]);
    const mediaBoxRef = context.register(mediaBox);

    const cropBox = context.obj([]);
    const cropBoxRef = context.register(cropBox);

    const rotate = context.obj(270);
    const rotateRef = context.register(rotate);

    const pageLeaf = PDFPageLeaf.withContextAndParent(context, parentRef);
    pageLeaf.set(PDFName.of('Contents'), contentsRef);
    pageLeaf.set(PDFName.of('Annots'), annotsRef);
    pageLeaf.set(PDFName.of('BleedBox'), bleedBoxRef);
    pageLeaf.set(PDFName.of('TrimBox'), trimBoxRef);
    pageLeaf.set(PDFName.of('Resources'), resourcesRef);
    pageLeaf.set(PDFName.of('MediaBox'), mediaBoxRef);
    pageLeaf.set(PDFName.of('CropBox'), cropBoxRef);
    pageLeaf.set(PDFName.of('Rotate'), rotateRef);

    expect(pageLeaf.Parent()).toBe(parent);
    expect(pageLeaf.Contents()).toBe(contents);
    expect(pageLeaf.Annots()).toBe(annots);
    expect(pageLeaf.BleedBox()).toBe(bleedBox);
    expect(pageLeaf.TrimBox()).toBe(trimBox);
    expect(pageLeaf.Resources()).toBe(resources);
    expect(pageLeaf.MediaBox()).toBe(mediaBox);
    expect(pageLeaf.CropBox()).toBe(cropBox);
    expect(pageLeaf.Rotate()).toBe(rotate);
  });

  it(`returns its Parent, Contents, Annots, BleedBox, TrimBox, Resources, MediaBox, CropBox, and Rotate entry values when they are direct objects`, () => {
    const context = PDFContext.create();

    const kids = context.obj([]);
    const count = context.obj(1);
    const parent = PDFPageTree.withContextAndKidsAndCount(context, kids, count);
    const parentRef = context.register(parent);

    const contents = context.obj([]);

    const annots = context.obj([]);

    const bleedBox = context.obj([]);

    const trimBox = context.obj([]);

    const resources = context.obj({});

    const mediaBox = context.obj([]);

    const cropBox = context.obj([]);

    const rotate = context.obj(270);

    const pageLeaf = PDFPageLeaf.withContextAndParent(context, parentRef);
    pageLeaf.set(PDFName.of('Contents'), contents);
    pageLeaf.set(PDFName.of('Annots'), annots);
    pageLeaf.set(PDFName.of('BleedBox'), bleedBox);
    pageLeaf.set(PDFName.of('TrimBox'), trimBox);
    pageLeaf.set(PDFName.of('Resources'), resources);
    pageLeaf.set(PDFName.of('MediaBox'), mediaBox);
    pageLeaf.set(PDFName.of('CropBox'), cropBox);
    pageLeaf.set(PDFName.of('Rotate'), rotate);

    expect(pageLeaf.Parent()).toBe(parent);
    expect(pageLeaf.Contents()).toBe(contents);
    expect(pageLeaf.Annots()).toBe(annots);
    expect(pageLeaf.BleedBox()).toBe(bleedBox);
    expect(pageLeaf.TrimBox()).toBe(trimBox);
    expect(pageLeaf.Resources()).toBe(resources);
    expect(pageLeaf.MediaBox()).toBe(mediaBox);
    expect(pageLeaf.CropBox()).toBe(cropBox);
    expect(pageLeaf.Rotate()).toBe(rotate);
  });

  it(`returns its Resources, MediaBox, CropBox, and Rotate entry values when they are inherited`, () => {
    const context = PDFContext.create();

    const resources = context.obj({});
    const resourcesRef = context.register(resources);

    const mediaBox = context.obj([]);
    const mediaBoxRef = context.register(mediaBox);

    const cropBox = context.obj([]);
    const cropBoxRef = context.register(cropBox);

    const rotate = context.obj(270);
    const rotateRef = context.register(rotate);

    const kids = context.obj([]);
    const count = context.obj(1);
    const parent = PDFPageTree.withContextAndKidsAndCount(context, kids, count);
    const parentRef = context.register(parent);

    parent.set(PDFName.of('Resources'), resourcesRef);
    parent.set(PDFName.of('MediaBox'), mediaBoxRef);
    parent.set(PDFName.of('CropBox'), cropBoxRef);
    parent.set(PDFName.of('Rotate'), rotateRef);

    const pageLeaf = PDFPageLeaf.withContextAndParent(context, parentRef);
    pageLeaf.delete(PDFName.of('Resources'));
    pageLeaf.delete(PDFName.of('MediaBox'));

    expect(pageLeaf.Parent()).toBe(parent);
    expect(pageLeaf.Resources()).toBe(resources);
    expect(pageLeaf.MediaBox()).toBe(mediaBox);
    expect(pageLeaf.CropBox()).toBe(cropBox);
    expect(pageLeaf.Rotate()).toBe(rotate);
  });

  it(`can be ascended`, () => {
    const context = PDFContext.create();

    const kidsRef1 = PDFRef.of(1);
    const kidsRef2 = PDFRef.of(2);

    const countRef1 = PDFRef.of(4);
    const countRef2 = PDFRef.of(5);

    const pageTree1 = PDFPageTree.withContextAndKidsAndCount(
      context,
      kidsRef1,
      countRef1,
    );
    const pageTree1Ref = context.register(pageTree1);

    const pageTree2 = PDFPageTree.withContextAndKidsAndCount(
      context,
      kidsRef2,
      countRef2,
      pageTree1Ref,
    );
    const pageTree2Ref = context.register(pageTree2);

    const pageLeaf = PDFPageLeaf.withContextAndParent(context, pageTree2Ref);

    const visitations: Array<PDFPageLeaf | PDFPageTree> = [];
    pageLeaf.ascend((node) => {
      visitations.push(node);
    });

    expect(visitations).toEqual([pageLeaf, pageTree2, pageTree1]);
  });
});
