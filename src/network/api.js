/*
 * @Author: your name
 * @Date: 2021-07-22 10:43:42
 * @LastEditTime: 2021-08-11 14:08:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \managementSystem\demo\src\network\api.js
 */
import { request } from "./request.js";

//登录接口
export const login = (data) => request({ url: 'login', method: 'post', data })
// 左侧菜单栏
export const reqMenus = () => request({ url: 'menus', method: 'get' })
// 获取用户列表
export const reqUsers = (params) => request({ url: 'users', method: 'get', params })
// 修改用户当前状态
export const reqUserState = (uId, type) => request({ url: `users/${uId}/state/${type}`, method: 'put' })
// 添加用户
export const reqAddUser = (data) => request({ url: 'users', method: 'post', data })
// 編輯用戶
export const reqEdit = (id, data) => request({ url: `users/${id}`, method: 'put', data })
// 删除用户
export const reqDeletUser = (id) => request({ url: `users/${id}`, method: 'delete' })
// 获取用户角色列表
export const reqUserRoles = () => request({ url: 'roles', method: 'get' })
// 分配角色
export const reqAssignRoles = (id, rid) => request({ url: `users/${id}/role`, method: 'put', data: { rid } })
// 权限管理
export const reqUserRights = () => request({ url: `rights/list`, method: 'get' })
// 删除角色
export const reqDelRole = (id) => request({ url: `roles/${id}`, method: 'delete' })
//权限分配
export const reqRolesAs = () => request({ url: `rights/tree`, method: 'get' })
// 角色授权
export const reqRolesReac = (roleId, rids) => request({ url: `roles/${roleId}/rights`, method: 'post', data: { rids } })
// 添加角色
export const reqAddRole = (data) => request({ url: 'roles', method: 'post', data })
// 编辑角色
export const reqEditRole = (id, data) => request({ url: `roles/${id}`, method: 'put', data })
// 获取商品列表数据
export const reqGoodsList = (query, pagenum, pagesize) => request({ url: 'goods', method: 'get', params: { query, pagenum, pagesize } })
// 删除商品
export const reqDelGoods = (id) => request({ url: `goods/${id}`, method: 'delete' })
// 商品分类数据列表
export const reqCategoriesList = () => request({ url: 'categories', method: 'get' })
// 商品分类参数列表
export const reqCatParams = (id,sel) => request({ url: `categories/${id}/attributes`, method: 'get',params:{sel} })
// 删除参数 categories/:id/attributes/:attrid
export const reqDelParams = (id,attrid) => request({url:` categories/${id}/attributes/${attrid}`,method:'delete'})
// 上传图片
export const reqUnpload = (data) => request({url:'upload',method:'post',data})
// 添加商品goods
export const reqAddGoods =  (data) => request({url:'goods',method:'post',data})
// 获取订单数据
export const reqOrderList = (params) => request({url:'orders',method:'get',params})
//获取数据统计
export const reqReports = () => request({url:'reports/type/1',method:'get'})