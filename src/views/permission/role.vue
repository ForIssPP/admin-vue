<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">新建群组</el-button>
    <el-button type="primary" @click="handleAddAdminNumber">新建管理账号</el-button>

    <el-table :data="rolesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="群组序号" width="220">
        <template slot-scope="scope">{{ scope.row.key }}</template>
      </el-table-column>
      <el-table-column align="center" label="群组名称" width="220">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="群组名">
          <el-input v-model="role.name" placeholder="群组名" />
        </el-form-item>
        <el-form-item label="页面菜单">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmRole">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="addAdminDialog" :title="'开通新账号'" @closed="closeAddAdmin">
      <el-form ref="addAdminForm" :rules="addAdminRules" :model="addAdminForm">
        <el-form-item label="设置账号" prop="account">
          <el-input v-model="addAdminForm.account" placeholder="设置账号" />
        </el-form-item>
        <el-form-item label="设置密码" prop="pwd">
          <el-input type="password" v-model="addAdminForm.pwd" placeholder="设置密码" />
        </el-form-item>
        <el-form-item label="再输入一次密码" prop="pwd_two">
          <el-input type="password" v-model="addAdminForm.pwd_two" placeholder="再输入一次密码" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="closeAddAdmin">取消</el-button>
        <el-button type="primary" @click="onAddAdmin">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { deepClone } from "@/utils";
import {
  addRoleAdmin,
  getRolePowerList,
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole
} from "@/api/role";

const defaultRole = {
  key: "",
  name: "",
  description: "",
  routes: []
};

export default {
  data() {
    const validatePwd = (rule, value, callback) => {
      if (!value || !value.length) {
        callback(new Error("请再次输入密码！"));
      } else if (value !== this.addAdminForm.pwd) {
        callback("俩次密码输入不一致！");
      } else {
        callback();
      }
    };
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: "新建群组",
      addAdminDialog: false,
      checkStrictly: false,
      adminKey: undefined,
      addAdminForm: {
        pwd: undefined,
        pwd_two: undefined,
        account: undefined
      },
      defaultProps: {
        children: "children",
        label: "title"
      },
      addAdminRules: {
        account: [{ required: true, trigger: "blur", message: "请输入账号名" }],
        pwd: [{ required: true, trigger: "blur", message: "请输入密码" }],
        pwd_two: [{ required: true, trigger: "blur", validator: validatePwd }]
      }
    };
  },
  computed: {
    routesData() {
      return this.routes;
    }
  },
  created() {
    // Mock: get all routes and roles list from server
    this.getRoutes();
    this.getRoles();
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes();
      this.serviceRoutes = res;
      console.dir(res);
      console.dir(this.generateRoutes(res));
      this.routes = this.generateRoutes(res);
    },
    async getRoles() {
      const res = await getRoles();
      this.rolesList = res.reverse();
    },

    // Reshape the routes structure so that it looks the same as the sidebar
    generateRoutes(routes, basePath = "/") {
      const res = [];
      for (let route of routes) {
        const onlyOneShowingChild = this.onlyOneShowingChild(
          route.children,
          route
        );

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild;
        }

        const data = {
          path: path.resolve(basePath, route.en_name),
          title: route.name,
          id: route.id
        };

        // recursive child routes
        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path);
        }
        res.push(data);
      }
      // console.log('-----------');
      // console.log(routes, res);
      return res;
    },
    generateArr(routes) {
      let data = [];
      routes.forEach(route => {
        data.push(route);
        if (route.children && route.children.length > 1) {
          const temp = this.generateArr(route.children);
          if (temp.length > 0) {
            data = [...data, ...temp];
          }
        }
      });
      return data;
    },
    handleAddRole() {
      this.dialogType = "新建群组";
      this.role = Object.assign({}, defaultRole);
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogVisible = true;
    },
    async handleEdit(scope) {
      this.dialogType = "修改权限";
      this.dialogVisible = true;
      this.checkStrictly = true;
      this.adminKey = scope.row.key;
      const res = await getRolePowerList(this.adminKey);
      if (res instanceof Array) {
        this.role.power = [];
      } else {
        this.role = res;
      }
      this.role.key = scope.row.key;
      this.role.name = scope.row.name;
      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.power);
        this.$refs.tree.setCheckedNodes(this.generateArr(routes));
        // set checked state of a node not affects its father and child nodes
        this.checkStrictly = false;
      });
    },
    handleDelete({ $index, row }) {
      this.$confirm("确定删除该群组？确认后将无法撤销！", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await deleteRole(row.key);
          this.rolesList.splice($index, 1);
          this.$message({
            type: "success",
            message: "Delete succed!"
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    generateTree(routes, basePath = "/", checkedKeys) {
      const res = [];

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path);

        // recursive child routes
        if (route.children) {
          route.children = this.generateTree(
            route.children,
            routePath,
            checkedKeys
          );
        }

        if (
          checkedKeys.includes(routePath) ||
          (route.children && route.children.length >= 1)
        ) {
          res.push(route);
        }
      }
      return res;
    },
    async confirmRole() {
      const isEdit = this.dialogType === "修改权限";
      const powerIds = this.$refs.tree.getCheckedKeys();
      console.log(powerIds);
      if (isEdit) {
        await updateRole(this.adminKey, powerIds);
      } else {
        const { name } = this.role;
        if (!name) {
          this.$message({
            type: "error",
            message: "请输入群组名"
          });
          return;
        }
        const key = await addRole(this.role.name, powerIds);
        this.role.key = key;
        this.rolesList.push(this.role);
      }
      console.log(this.role);
      const { description, key, name } = this.role;
      this.dialogVisible = false;
      this.$notify({
        title: "创建成功",
        dangerouslyUseHTMLString: true,
        message: `
            <div>群组序号: ${key}</div>
            <div>群组名称: ${name}</div>
          `,
        type: "success"
      });
    },
    // reference: src/view/layout/components/Sidebar/SidebarItem.vue
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null;
      const showingChildren = children;

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return onlyOneChild;
      }

      return false;
    },
    handleAddAdminNumber() {
      this.addAdminDialog = true;
      // TODO
    },
    onAddAdmin() {
      this.$refs.addAdminForm.validate(valid => {
        if (valid) {
          const { account, pwd } = this.addAdminForm;
          addRoleAdmin(account, pwd).then(
            res =>
              this.$notify({
                title: "创建成功",
                message: `账号${account}创建成功`,
                type: "success"
              }),
            this.closeAddAdmin()
          );
        }
      });
    },
    closeAddAdmin() {
      this.addAdminDialog = false;
      this.$refs.addAdminForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
