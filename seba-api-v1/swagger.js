'use strict';

module.exports = {
  swaggerDefinition: {
    // 정보
    info: {
      title: 'seba-api',
      version: '1.0.0',
      description: 'semi-basement api doc'
    },
    // 주소
    host: 'localhost:6508',
    // 기본 root path
    basePath: '/',
    contact: {
      email: ''
    },
    // 각 api에서 설명을 기록할 때 사용할 constant들을 미리 등록해놓는것
    components: {
      res: {
        BadRequest: {
          description: '잘못된 요청입니다',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        },
        Forbidden: {
          description: '권한이 없습니다',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        },
        NotFound: {
          description: '해당 리소스가 없습니다',
          schema: {
            $ref: '#/components/errorResult/Error'
          }
        }
      },
      errorResult: {
        Error: {
          type: 'object',
          properties: {
            errMsg: {
              type: 'string',
              description: '에러 메시지 전달.'
            }
          }
        }
      }
    },
    schemes: ['http', 'https'], // 가능한 통신 방식
    definitions: {
      Music: {
        properties: {
          id: { type: 'integer', format: 'int64' },
          title: { type: 'string' },
          musician: { type: 'string' },
          musicianImg: { type: 'string' },
          description: { type: 'string' },
          artworkImg: { type: 'string' },
          duration: { type: 'integer' },
          streamUrl: { type: 'string' },
          playCount: { type: 'integer' },
          createdAtSoundcloud: { type: 'string', format: 'date' },
          createdAt: { type: 'string', format: 'date' }
        },
        type: 'object'
      },
      Featured: {
        properties: {
          id: { type: 'integer', format: 'int64' },
          type: {
            type: 'string',
            enum: ['FLOW', 'PUNCHLINE', 'BEAT']
          },
          time: { type: 'string' },
          createdAt: { type: 'string', format: 'date' }
        },
        type: 'object'
      },
      Comment: {
        properties: {
          id: { type: 'integer', format: 'int64' },
          content: { type: 'string' },
          createdAt: { type: 'string', format: 'date' }
        },
        type: 'object'
      },
      MusicDetail: {
        properties: {
          id: { type: 'integer', format: 'int64' },
          title: { type: 'string' },
          musician: { type: 'string' },
          musicianImg: { type: 'string' },
          description: { type: 'string' },
          artworkImg: { type: 'string' },
          duration: { type: 'integer' },
          streamUrl: { type: 'string' },
          playCount: { type: 'integer' },
          createdAtSoundcloud: { type: 'string', format: 'date' },
          createdAt: { type: 'string', format: 'date' },
          featureds: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                type: {
                  type: 'string'
                },
                count: {
                  type: 'integer'
                }
              }
            }
          }
        },
        type: 'object'
      },
      MusicRegisterForm: {
        properties: {
          url: { type: 'string' },
          title: { type: 'string' },
          musician: { type: 'string' },
          description: { type: 'string' },
          artworkImg: { type: 'string' },
          lylic: { type: 'string' }
        }
      },
      SnsModifyForm: {
        properties: {
          email: { type: 'string' },
          snsFacebook: { type: 'string' },
          snsInstagram: { type: 'string' },
          snsTwitter: { type: 'string' }
        }
      },
      NameModifyForm: {
        properties: {
          email: { type: 'string' },
          name: { type: 'string' }
        }
      },
      User: {
        properties: {
          id: { type: 'integer', format: 'int64' },
          name: { type: 'string' },
          email: { type: 'string' },
          snsFacebook: { type: 'string' },
          snsInstagram: { type: 'string' },
          snsTwitter: { type: 'string' },
          profileImg: { type: 'string' },
          backgroundImg: { type: 'string' },
          createdAt: { type: 'string', format: 'date' }
        }
      }
    }
  },
  apis: ['./routes/**/*.js'] // api 파일 위치들
};
