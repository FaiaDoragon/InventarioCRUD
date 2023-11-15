"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Producto = void 0;
const typeorm_1 = require("typeorm");
let Producto = class Producto extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.ID = 0;
        this.ESTADO = true;
        this.NOMBRE = '';
        this.MARCA = '';
        this.IMG = '';
        this.PRECIO = 0;
        this.STOCK = 0;
        this.TALLA = '';
        this.COLOR = '';
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
};
exports.Producto = Producto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Producto.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Producto.prototype, "ESTADO", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Producto.prototype, "NOMBRE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Producto.prototype, "MARCA", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Producto.prototype, "IMG", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 0 }),
    __metadata("design:type", Number)
], Producto.prototype, "PRECIO", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Producto.prototype, "STOCK", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Producto.prototype, "TALLA", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Producto.prototype, "COLOR", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Producto.prototype, "updatedAt", void 0);
exports.Producto = Producto = __decorate([
    (0, typeorm_1.Entity)('Productos')
], Producto);
let Admin = class Admin extends typeorm_1.BaseEntity {
    constructor() {
        super(...arguments);
        this.ID = 0;
        this.ESTADO = true;
        this.NOMBRE = '';
        this.APELLIDO = '';
        this.EDAD = 0;
        this.USUARIO = '';
        this.PASSWORD = '';
    }
};
exports.Admin = Admin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Admin.prototype, "ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Admin.prototype, "ESTADO", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Admin.prototype, "NOMBRE", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Admin.prototype, "APELLIDO", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Admin.prototype, "EDAD", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Admin.prototype, "USUARIO", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Admin.prototype, "PASSWORD", void 0);
exports.Admin = Admin = __decorate([
    (0, typeorm_1.Entity)('Admin')
], Admin);
//# sourceMappingURL=entities.js.map