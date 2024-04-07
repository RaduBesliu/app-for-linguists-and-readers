import { ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Alignment, Alignments } from '../../api/alignment/types.ts';
import { AlignmentsContext } from './context.ts';
import { StoriesContext } from '../StoriesProvider/context.ts';
import { AuthContext } from '../AuthProvider/context.ts';
import { createRandomColorGenerator, generateRandomId } from '../../utils';
import { setProfile } from '../../api/profile';
import { AlertContext } from '../AlertProvider/context.ts';
import { MESSAGES } from '../../utils/defines.ts';
import { LoaderContext } from '../LoaderProvider/context.ts';
import { useWorker } from '@koale/useworker';
import { Story } from '../../api/story/types.ts';
import _ from 'lodash';

const AlignmentsProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const { currentProfile, setCurrentProfile } = useContext(AuthContext);
  const { story, secondStory } = useContext(StoriesContext);
  const { showAlert } = useContext(AlertContext);

  const [allUserAlignments, setAllUserAlignments] = useState<Alignments[]>([]);
  const [currentStoriesAlignment, setCurrentStoriesAlignment] = useState<Alignments | undefined>();
  const [localAlignment, setLocalAlignment] = useState<Alignment | undefined>();

  const [selectedMode, setSelectedMode] = useState<('constituents' | 'sentences' | 'read' | 'default alignments')[]>([
    'read',
  ]);
  const [spacedSentences, setSpacedSentences] = useState<boolean>(false);

  const [alignmentColorGenerator, setAlignmentColorGenerator] = useState<{ next: () => string }>(
    createRandomColorGenerator(),
  );
  const [colorMappingObject, setColorMappingObject] = useState<Record<string, string[]>>({});
  const [defaultAlignmentsColorMappingObject, setDefaultAlignmentsColorMappingObject] = useState<
    Record<string, string[]>
  >({});

  const [defaultAlignmentsIdsMappingObject, setDefaultAlignmentsIdsMappingObject] = useState<
    Record<string, (string | undefined)[]>
  >({});
  const [extendedLocalAlignmentConstituentIds, setExtendedLocalAlignmentConstituentIds] = useState<
    (string | undefined)[]
  >([]);

  const [selectedAlignmentId, setSelectedAlignmentId] = useState<string | undefined>();
  const [scrollSync, setScrollSync] = useState<boolean>(true);

  useEffect(() => {
    setAllUserAlignments(currentProfile?.personalAlignments ?? []);
    console.log('[AlignmentsProvider] allUserAlignments', currentProfile?.personalAlignments);
  }, [currentProfile?.personalAlignments]);

  useEffect(() => {
    if (!story || !secondStory) {
      setCurrentStoriesAlignment(undefined);
      setColorMappingObject({});
      return;
    }

    const storyAlignment = allUserAlignments.find(
      (alignment) => alignment.leftStoryId === story.id && alignment.rightStoryId === secondStory.id,
    );

    console.log('[AlignmentsProvider] storyAlignment', storyAlignment);

    if (storyAlignment) {
      generateColorMappingObjectForLocalAlignment(storyAlignment).then();
    } else {
      setColorMappingObject({});
    }

    setCurrentStoriesAlignment(storyAlignment);
  }, [story, secondStory, allUserAlignments]);

  useEffect(() => {
    setLocalAlignment(undefined);
    setAlignmentColorGenerator(createRandomColorGenerator());
  }, [currentProfile, story, secondStory]);

  useEffect(() => {
    console.log('[AlignmentsProvider] defaultAlignmentColors', defaultAlignmentsColorMappingObject);
  }, [defaultAlignmentsColorMappingObject]);

  useEffect(() => {
    console.log('[AlignmentsProvider] defaultAlignmentIds', defaultAlignmentsIdsMappingObject);
  }, [defaultAlignmentsIdsMappingObject]);

  useEffect(() => {
    setExtendedLocalAlignmentConstituentIds(
      _.uniq(
        _.flatten([
          ...(localAlignment?.leftConstituentIds?.map((id) => defaultAlignmentsIdsMappingObject[id]) ?? []),
          ...(localAlignment?.rightConstituentIds?.map((id) => defaultAlignmentsIdsMappingObject[id]) ?? []),
          ...(localAlignment?.leftConstituentIds ?? []),
          ...(localAlignment?.rightConstituentIds ?? []),
        ]),
      ),
    );
  }, [localAlignment]);

  useEffect(() => {
    console.log('[AlignmentsProvider] extendedLocalAlignmentConstituentIds', extendedLocalAlignmentConstituentIds);
  }, [extendedLocalAlignmentConstituentIds]);

  const handleDefaultAlignments = async ({
    localStory,
    localSecondStory,
  }: {
    localStory?: Story;
    localSecondStory?: Story;
  }) => {
    const romanianStory = localStory?.language === 'romanian' ? localStory : localSecondStory;
    const otherStory = localStory?.language === 'romanian' ? localSecondStory : localStory;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';

    if (!romanianStory) {
      return [{}, {}];
    }

    if (romanianStory?.sentences?.length !== otherStory?.sentences?.length) {
      return [{}, {}];
    }

    const _colorMappingObject: Record<string, string[]> = {};
    const _idsMappingObject: Record<string, (string | undefined)[]> = {};

    romanianStory?.sentences?.forEach((sentence, sentenceIndex) => {
      sentence?.defaultAlignmentIds?.forEach((defaultAlignment, alignmentIndex) => {
        const randomRed = Math.floor(Math.random() * 256);
        const randomGreen = Math.floor(Math.random() * 256);
        const randomBlue = Math.floor(Math.random() * 256);
        const color = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;

        result = '';
        for (let i = 0; i < 20; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        const randomAlignmentId = result;

        const targetConstituentId = otherStory?.sentences?.[sentenceIndex]?.constituents?.[alignmentIndex]?.id;
        const sourceConstituentIds = defaultAlignment.map((alignment) => {
          return sentence?.constituents?.[alignment]?.id;
        });

        if (sourceConstituentIds) {
          sourceConstituentIds.forEach((sourceConstituentId) => {
            if (sourceConstituentId) {
              _colorMappingObject[sourceConstituentId] = [randomAlignmentId, color];

              _idsMappingObject[sourceConstituentId] = [
                ...(sourceConstituentIds.filter((id) => id !== sourceConstituentId) ?? []),
                targetConstituentId,
              ];
            }
          });
        }

        if (targetConstituentId && sourceConstituentIds.length) {
          _colorMappingObject[targetConstituentId] = [randomAlignmentId, color];

          _idsMappingObject[targetConstituentId] = [...(sourceConstituentIds ?? [])];
        }
      });
    });

    return [_colorMappingObject, _idsMappingObject];
  };

  const [defaultAlignmentsColorMappingWorker] = useWorker(handleDefaultAlignments, {
    autoTerminate: true,
  });

  useEffect(() => {
    if (isLoading || !story || !secondStory) {
      return;
    }

    setIsLoading(true);
    defaultAlignmentsColorMappingWorker({
      localStory: story,
      localSecondStory: secondStory,
    }).then(async (result) => {
      const [_defaultAlignmentsColorMappingObject, _defaultAlignmentsIdsMappingObject] = await result;
      setIsLoading(false);
      // @ts-expect-error: Problems with string | undefined
      setDefaultAlignmentsColorMappingObject(_defaultAlignmentsColorMappingObject ?? {});
      setDefaultAlignmentsIdsMappingObject(_defaultAlignmentsIdsMappingObject ?? {});
    });
  }, [secondStory]);

  const generateColorMappingObjectForLocalAlignment = async (storiesAlignment: Alignments, idsToDelete?: string[]) => {
    const _colorMappingObject: Record<string, string[]> = { ...colorMappingObject };

    if (idsToDelete) {
      idsToDelete.forEach((id) => {
        delete _colorMappingObject[id];
      });
    }

    storiesAlignment.sentenceAlignments.forEach((alignment) => {
      const color = alignmentColorGenerator.next();
      const concatSentencesIds = alignment?.leftSentenceIds?.concat(alignment?.rightSentenceIds ?? []);
      concatSentencesIds?.forEach((sentenceId) => {
        if (!_colorMappingObject[sentenceId]) {
          _colorMappingObject[sentenceId] = [alignment.id, color];
        }
      });
    });

    storiesAlignment.constituentAlignments.forEach((alignment) => {
      const color = alignmentColorGenerator.next();
      const concatConstituentIds = alignment?.leftConstituentIds?.concat(alignment?.rightConstituentIds ?? []);
      concatConstituentIds?.forEach((constituentId) => {
        if (!_colorMappingObject[constituentId]) {
          _colorMappingObject[constituentId] = [alignment.id, color];
        }
      });
    });

    setColorMappingObject(_colorMappingObject);
  };

  const saveLocalAlignment = async (leftStoryId: string, rightStoryId: string, alignment: Alignment) => {
    let newAlignment = currentStoriesAlignment;

    if (!newAlignment) {
      newAlignment = {
        id: generateRandomId({}),
        leftStoryId,
        rightStoryId,
        sentenceAlignments: [],
        constituentAlignments: [],
      };
    }

    // TODO - modify this to allow updating alignments
    if (selectedMode.includes('sentences')) {
      newAlignment.sentenceAlignments.push(alignment);
    } else {
      newAlignment.constituentAlignments.push(alignment);
    }

    try {
      setCurrentStoriesAlignment(newAlignment);
      if (currentProfile?.email) {
        const newProfile = {
          ...currentProfile,
          personalAlignments: allUserAlignments.map((alignment) => {
            if (alignment.id === newAlignment?.id) {
              return newAlignment;
            }
            return alignment;
          }),
        };

        if (!allUserAlignments.find((alignment) => alignment.id === newAlignment?.id)) {
          newProfile.personalAlignments.push(newAlignment);
        }

        setCurrentProfile(newProfile);
        await setProfile(currentProfile.email, newProfile);
      }

      setLocalAlignment(undefined);

      showAlert('success', MESSAGES.successSaveAlignment);
      console.log('[saveLocalAlignment] Updated profile alignments:', allUserAlignments);
    } catch (error) {
      showAlert('error', MESSAGES.errorSaveAlignment);
      console.error('[saveLocalAlignment] Error updating profile:', error);
    }
  };

  const deleteAlignment = async (alignmentId: string) => {
    try {
      let newStoriesAlignment =
        selectedMode[0] === 'sentences'
          ? currentStoriesAlignment?.sentenceAlignments ?? []
          : selectedMode[0] === 'constituents'
            ? currentStoriesAlignment?.constituentAlignments ?? []
            : [];

      if (!newStoriesAlignment) {
        showAlert('error', MESSAGES.errorDeleteAlignment);
        return;
      }

      const deletedAlignment = newStoriesAlignment.find((alignment) => alignment.id === alignmentId);
      const concatenatedIds =
        selectedMode[0] === 'sentences'
          ? deletedAlignment?.leftSentenceIds?.concat(deletedAlignment?.rightSentenceIds ?? [])
          : deletedAlignment?.leftConstituentIds?.concat(deletedAlignment?.rightConstituentIds ?? []);

      newStoriesAlignment = newStoriesAlignment.filter((alignment) => alignment.id !== alignmentId);

      if (story && secondStory) {
        const updatedStoriesAlignment: Alignments = {
          id: currentStoriesAlignment?.id ?? generateRandomId({}),
          leftStoryId: story.id,
          rightStoryId: secondStory.id,
          sentenceAlignments:
            selectedMode[0] === 'sentences' ? newStoriesAlignment : currentStoriesAlignment?.sentenceAlignments ?? [],
          constituentAlignments:
            selectedMode[0] === 'constituents'
              ? newStoriesAlignment
              : currentStoriesAlignment?.constituentAlignments ?? [],
        };

        setCurrentStoriesAlignment(updatedStoriesAlignment);
        setSelectedAlignmentId(undefined);
        await generateColorMappingObjectForLocalAlignment(updatedStoriesAlignment, concatenatedIds);

        if (currentProfile?.email) {
          const newProfile = {
            ...currentProfile,
            personalAlignments: allUserAlignments.map((alignment) => {
              if (alignment.id === updatedStoriesAlignment.id) {
                return updatedStoriesAlignment;
              }
              return alignment;
            }),
          };

          setCurrentProfile(newProfile);
          await setProfile(currentProfile.email, newProfile);

          showAlert('success', MESSAGES.successDeleteAlignment);
          console.log('[deleteAlignment] Updated profile alignments:', allUserAlignments);
        }
      }
    } catch (error) {
      showAlert('error', MESSAGES.errorDeleteAlignment);
      console.error('[deleteAlignment] Error updating profile:', error);
    }
  };

  const value = useMemo(
    () => ({
      allUserAlignments,
      currentStoriesAlignment,
      localAlignment,
      selectedMode,
      spacedSentences,
      colorMappingObject,
      defaultAlignmentsColorMappingObject,
      extendedLocalAlignmentConstituentIds,
      selectedAlignmentId,
      scrollSync,
      deleteAlignment,
      setAllUserAlignments,
      setCurrentStoriesAlignment,
      setLocalAlignment,
      setSelectedMode,
      setSpacedSentences,
      saveLocalAlignment,
      setSelectedAlignmentId,
      setScrollSync,
    }),
    [
      allUserAlignments,
      currentStoriesAlignment,
      localAlignment,
      selectedMode,
      spacedSentences,
      colorMappingObject,
      defaultAlignmentsColorMappingObject,
      extendedLocalAlignmentConstituentIds,
      selectedAlignmentId,
      scrollSync,
      deleteAlignment,
      saveLocalAlignment,
    ],
  );

  return <AlignmentsContext.Provider value={value}>{children}</AlignmentsContext.Provider>;
};

export default AlignmentsProvider;
