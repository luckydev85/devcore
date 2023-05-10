import { Node, mergeAttributes } from "@tiptap/core";
import ExternalVideoView from "./ExternalVideoView.vue";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
export default Node.create({
  name: "external-video",

  addOptions() {
    return {
      inline: false,
      HTMLAttributes: {}
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null
      },
      title: {
        default: null
      },
      frameborder: {
        default: "0"
      },
      allow: {
        default:
          "accelerometer; autoplay; clipboard-write; modestbranding; encrypted-media; gyroscope; picture-in-picture"
      },
      allowfullscreen: {
        default: "allowfullscreen"
      },
      width: {
        default: 560
      },
      height: {
        default: 315
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe[src]"
      }
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      { class: "video-wrapper" },
      [
        "iframe",
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0
      ]
    ];
  },
  addNodeView() {
    return VueNodeViewRenderer(ExternalVideoView);
  },
  addCommands() {
    return {
      setExternalVideo: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        });
      }
    };
  }
});
