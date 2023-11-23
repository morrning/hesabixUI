<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  name: "archiveUpload",
  props:{
    doctype: String,
    docid: String
  },
  data() {
    return {
      media: {
        saved: [],
        added: [],
        removed: []
      }
    }
  },
  methods:{
    changeMedia(media){
      this.media = media
    },
    addMedia(addedImage, addedMedia){
      this.media.added = addedMedia
    },
    removeMedia(removedImage, removedMedia){
      this.media.removed = removedMedia
    },
    submitArchive(){
      let formData = new FormData(document.getElementById('archive-file-upload'))
      axios.post('api/archive/file/save',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  },
})
</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#archiveModal">
    <i class="fa fa-file"></i>
  </button>

  <!-- Modal -->
  <div class="modal modal-lg fade" id="archiveModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">آرشیو فایل</h1>
          <div class="block-options">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
        </div>
        <div class="modal-body">
          <div>
            <form id="archive-file-upload" @submit.prevent="submitArchive()">
              <input type="hidden" name="doctype" :value="this.$props.doctype">
              <input type="hidden" name="docid" :value="this.$props.docid">
              <Uploader
                  :server="this.$filters.getApiUrl() + '/api/archive/file/upload'"
                  :media="media.saved"
                  path="/storage/media"
                  @add="addMedia"
                  @remove="removeMedia"
                  @change="changeMedia"
                  :maxFilesize="5"
              />
              <div class="block-options">
                <button type="submit" class="btn btn-sm btn-success mt-2">
                  <i class="fa fa-save me-2"></i>
                  ذخیره
                </button>
              </div>
            </form>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بازگشت</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>