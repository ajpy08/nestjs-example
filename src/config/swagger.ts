import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const getSwaggerOptions = () => {
  return {
    // eslint-disable-next-line max-len
    customCss: `.topbar-wrapper img { content:url('data:image/png;base64,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');
      width:150px; height:auto;
    }
    .swagger-ui .topbar { background-color: #05131d; border-bottom: 15px solid #3ed3b6; }
    `,
    customSiteTitle: 'Tech Talk API Docs',
  };
};

export async function initSwagger(
  app: INestApplication,
  config: ConfigService,
) {
  const DocsConfig = new DocumentBuilder()
    .setTitle('Tech Talk API Docs')
    .setDescription(
      'This is an example of documentation in NestJs with swagger',
    )
    .setContact('API Support', '', 'angelpuc08@gmail.com')
    .setLicense('MIT', 'https://www.github.com/')
    .setVersion(config.get('npm_package_version'))
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();
  const document = SwaggerModule.createDocument(app, DocsConfig);
  SwaggerModule.setup('api/docs', app, document, getSwaggerOptions());
}
