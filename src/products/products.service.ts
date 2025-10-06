import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    private readonly paginationService: PaginationService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    await this.productsRepository.save(product);
    return {
      message: 'Product created successfully',
      product,
    };
  }

  async getProducts(page = 1, limit = 10) {
    const products = await this.productsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalItems = await this.productsRepository.count();
    const meta = this.paginationService.getPaginationMeta(
      page,
      limit,
      totalItems,
    );

    return { products, meta };
  }

  async getProductById(id: string) {
    return await this.productsRepository.findOneBy({ id });
  }

  // update(id: string, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  async remove(id: string) {
    return await this.productsRepository.delete({ id });
  }
}
