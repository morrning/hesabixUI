<template>
  <v-toolbar flat>
      <v-toolbar-title>
        <v-icon class="mx-2">mdi-table</v-icon>
        جدول حساب‌ها
      </v-toolbar-title>
    </v-toolbar>

    <loading
      color="blue"
      loader="dots"
      v-model:active="isLoading"
      :is-full-page="false"
      class="text-center"
    />

    <Tree :nodes="tree" :config="config" class="tree-view-style">
      <template #after-input="{ node }">
        <div class="node-actions" v-if="isAccproActive">
          <v-icon
            small
            color="success"
            class="mx-1"
            @click.stop="openAddDialog(node)"
          >
            mdi-plus
          </v-icon>
          <v-icon
            v-if="!node.is_public"
            small
            color="primary"
            class="mx-1"
            @click.stop="openEditDialog(node)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            v-if="!node.is_public && (!node.children || node.children.length === 0)"
            small
            color="error"
            class="mx-1"
            @click.stop="openDeleteDialog(node)"
          >
            mdi-delete
          </v-icon>
        </div>
      </template>
    </Tree>

    <!-- دیالوگ اضافه کردن زیرمجموعه -->
    <v-dialog v-model="addDialog" max-width="400">
      <v-card>
        <v-card-title>اضافه کردن زیرمجموعه</v-card-title>
        <v-card-text>
          <v-text-field v-model="newNodeText" label="نام ردیف حساب جدید"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="addDialog = false">لغو</v-btn>
          <v-btn color="success" @click="addNode">ثبت</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- دیالوگ ویرایش -->
    <v-dialog v-model="editDialog" max-width="400">
      <v-card>
        <v-card-title>ویرایش ردیف حساب</v-card-title>
        <v-card-text>
          <v-text-field v-model="editNodeText" label="نام ردیف حساب"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="editDialog = false">لغو</v-btn>
          <v-btn color="primary" @click="saveEditNode">ذخیره</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- دیالوگ حذف -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title>حذف ردیف حساب</v-card-title>
        <v-card-text>
          آیا مطمئنی که می‌خوای ردیف حساب "{{ selectedNode?.text }}" رو حذف کنی؟
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="deleteDialog = false">لغو</v-btn>
          <v-btn color="error" @click="confirmDeleteNode">حذف</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- دیالوگ پیام عمومی -->
    <v-dialog v-model="messageDialog" max-width="400">
      <v-card>
        <v-card-title>{{ messageTitle }}</v-card-title>
        <v-card-text>{{ messageText }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="messageDialog = false">بستن</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { ref } from "vue";
import Tree from "vue3-treeview";
import "vue3-treeview/dist/style.css";
import axios from "axios";
import Loading from "vue-loading-overlay";

export default {
  name: "Table",
  components: {
    Tree,
    Loading,
  },
  setup() {
    const isLoading = ref(true);
    const isAccproActive = ref(false);
    const tree = ref({});
    const config = ref({
      roots: [],
      opened: true,
      openedIcon: {
        type: "shape",
        stroke: "black",
        strokeWidth: 3,
        viewBox: "0 0 24 24",
        draw: "M 2 12 L 22 12",
      },
      closedIcon: {
        type: "shape",
        stroke: "black",
        strokeWidth: 3,
        viewBox: "0 0 24 24",
        draw: "M 12 2 L 12 22 M 2 12 L 22 12",
      },
    });
    const addDialog = ref(false);
    const editDialog = ref(false);
    const deleteDialog = ref(false);
    const messageDialog = ref(false);
    const messageTitle = ref("");
    const messageText = ref("");
    const newNodeText = ref("");
    const editNodeText = ref("");
    const selectedNode = ref(null);

    // چک کردن پلاگین accpro
    const checkAccproPlugin = () => {
      axios
        .post("/api/plugin/get/actives")
        .then((response) => {
          isAccproActive.value = !!response.data["accpro"];
        })
        .catch((error) => {
          console.error("خطا در بررسی پلاگین‌ها:", error);
          isAccproActive.value = false;
        });
    };

    // بارگذاری داده‌ها
    const loadData = () => {
      axios
        .post("/api/accounting/table/get")
        .then((response) => {
          tree.value = response.data;
          if (tree.value["1"] && tree.value["1"].children) {
            config.value.roots = tree.value["1"].children;
          } else {
            console.warn("ردیف حساب ریشه '1' یا فرزندانش پیدا نشد!");
            config.value.roots = [];
          }
          isLoading.value = false;
        })
        .catch((error) => {
          console.error("خطا در دریافت داده‌ها:", error);
          isLoading.value = false;
        });
    };

    // نمایش پیام
    const showMessage = (title, text) => {
      messageTitle.value = title;
      messageText.value = text;
      messageDialog.value = true;
    };

    // اضافه کردن زیرمجموعه
    const openAddDialog = (node) => {
      selectedNode.value = node;
      newNodeText.value = "";
      addDialog.value = true;
    };

    const addNode = () => {
      axios
        .post("/api/accounting/table/add", {
          text: newNodeText.value,
          parentId: selectedNode.value.id,
        })
        .then((response) => {
          if (response.data.result === 1) {
            const newNode = response.data.node;
            tree.value[newNode.id] = newNode;
            if (!tree.value[selectedNode.value.id].children) {
              tree.value[selectedNode.value.id].children = [];
            }
            tree.value[selectedNode.value.id].children.push(newNode.id);
            addDialog.value = false;
            showMessage("موفقیت", "ردیف حساب با موفقیت اضافه شد!");
          } else {
            showMessage("خطا", response.data.message || "خطا در افزودن ردیف حساب!");
          }
        })
        .catch((error) => {
          console.error("خطا در افزودن ردیف حساب:", error);
          showMessage("خطا", "خطا در افزودن ردیف حساب!");
        });
    };

    // ویرایش ردیف حساب
    const openEditDialog = (node) => {
      selectedNode.value = node;
      editNodeText.value = node.text;
      editDialog.value = true;
    };

    const saveEditNode = () => {
      axios
        .post("/api/accounting/table/edit", {
          id: selectedNode.value.id,
          text: editNodeText.value,
        })
        .then((response) => {
          console.log("پاسخ سرور برای ویرایش:", response.data);
          if (response.data.result === 1) {
            // حفظ ویژگی‌های قبلی نود و فقط آپدیت موارد برگشتی
            tree.value[selectedNode.value.id] = {
              ...tree.value[selectedNode.value.id], // نگه داشتن ویژگی‌های قبلی
              ...response.data.node, // اعمال تغییرات جدید
            };
            editDialog.value = false;
            showMessage("موفقیت", "ردیف حساب با موفقیت ویرایش شد!");
          } else {
            showMessage("خطا", response.data.message || "خطا در ویرایش ردیف حساب!");
          }
        })
        .catch((error) => {
          console.error("خطا در ویرایش ردیف حساب:", error);
          showMessage("خطا", "خطا در ویرایش ردیف حساب!");
        });
    };

    // حذف ردیف حساب
    const openDeleteDialog = (node) => {
      selectedNode.value = node;
      deleteDialog.value = true;
    };

    const confirmDeleteNode = () => {
      axios
        .post("/api/accounting/table/delete", { id: selectedNode.value.id })
        .then((response) => {
          if (response.data.result === 1) {
            delete tree.value[selectedNode.value.id];
            Object.values(tree.value).forEach((node) => {
              if (node.children) {
                node.children = node.children.filter(
                  (childId) => childId !== selectedNode.value.id
                );
              }
            });
            deleteDialog.value = false;
            showMessage("موفقیت", "ردیف حساب با موفقیت حذف شد!");
          } else {
            showMessage("خطا", response.data.message || "خطا در حذف ردیف حساب!");
          }
        })
        .catch((error) => {
          console.error("خطا در حذف ردیف حساب:", error);
          showMessage("خطا", "خطا در حذف ردیف حساب!");
        });
    };

    // اجرای اولیه
    checkAccproPlugin();
    loadData();

    return {
      isLoading,
      isAccproActive,
      tree,
      config,
      addDialog,
      editDialog,
      deleteDialog,
      messageDialog,
      messageTitle,
      messageText,
      newNodeText,
      editNodeText,
      selectedNode,
      checkAccproPlugin,
      loadData,
      showMessage,
      openAddDialog,
      addNode,
      openEditDialog,
      saveEditNode,
      openDeleteDialog,
      confirmDeleteNode,
    };
  },
};
</script>

<style scoped>
:deep(.tree-node) {
  padding: 8px 16px;
  transition: background-color 0.3s;
}

:deep(.tree-node:hover) {
  background-color: #f5f5f5;
}

.node-actions {
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
}

:deep(.tree-node) .node-actions {
  opacity: 0;
  transition: opacity 0.2s;
}
:deep(.tree-node:hover) .node-actions {
  opacity: 1;
}
</style>