<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 17/07/28. -->

<template>
  <div @click="onLinkClick">
    <wxc-rich-text-text
      :text-value="linkValue"
      :has-text-margin="hasTextMargin"
      :text-style="linkStyle?linkStyle:defObj"
      :text-theme="linkTheme?linkTheme:'black'"></wxc-rich-text-text>
  </div>
</template>

<script>
  import WxcRichTextText from './wxc-rich-text-text.vue'

  export default {
    components: { WxcRichTextText },
    props: {
      linkValue: {
        type: [String, Number],
        default: ''
      },
      hasTextMargin: {
        type: Boolean,
        default: true
      },
      linkHref: {
        type: String,
        default: ''
      },
      linkTheme: {
        type: String,
        default: 'black'
      },
      linkStyle: {
        type: Object,
        default: () => ({})
      }
    },
    data: () => ({
      defObj: {}
    }),
    methods: {
      onLinkClick (e) {
        const self = this;
        // Utils.goToH5Page(self.linkHref);
        self.$emit('wxcRichTextLinkClick', { element: e, href: self.linkHref });
      }
    }
  };
</script>
